const router = require('express').Router();
const Joi = require('@hapi/joi');
const _ = require('lodash');
const { Admin } = require('../Database/connection');
const { encrypt } = require('../helper/hash');
const { compare } = require('../helper/hash');
const rootAuthentication = require('../middleware/rootAuth');
//validation
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
function validateAdmin(admin)
{
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(16),
        phoneNumber: Joi.string().regex(/^(03|70|71|76|81|78|79|86)\d{6}$/),
        email: Joi.string().required()
            .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password: Joi.string().required().regex(mediumRegex),
        dateOfBirth: Joi.date().required()
    });
    return schema.validate(admin);
}

function validateUpdatedAdmin(admin)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(16),
        phoneNumber: Joi.string()
            .regex(/^(03|70|71|76|81|78|79|86)\d{6}$/)
            .message("Please enter a valid phone number"),
        email: Joi.string()
            .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .message("Please enater a valid email"),
        password: Joi.string()
            .regex(mediumRegex)
            .message("Please enter a strong password"),
        dateOfBirth: Joi.date()
    });
    return schema.validate(admin);
}
//routes
router.post('/', rootAuthentication, async (req, res) =>
{
    const admin = req.body;
    const { error } = validateAdmin(admin);
    if (error) return res.status(400).send(error);
    admin.password = await encrypt(admin.password);
    const adminToAdd = new Admin(admin);
    await adminToAdd.save();
    res.sendStatus(200);
});

router.post('/autAdmin', async (req, res) =>
{
    const cred = req.body;
    const email = cred.email;
    const pass = cred.password;
    if (!(email && pass)) return res.status(400).send('email and pass are required!!');
    const adminToAdd = await Admin.findOne({ email: email });
    if (!(adminToAdd && await compare(pass, adminToAdd.password))) return res.status(404).send('incorrect email or password');
    res.status(200).send(adminToAdd.generateAuthKey());
})

router.delete('/:email', rootAuthentication, async (req, res) =>
{
    const adminToDelete = await Admin.findOneAndDelete({ email: req.params.email });
    if (!adminToDelete) return res.sendStatus(404);
    res.status(200).send(_.pick(adminToDelete, ['_id', 'name', 'phoneNumber', 'email']));
});

router.put('/:email', rootAuthentication, async (req, res) =>
{
    const adminToUpdate = await Admin.findOne({ email: req.params.email });
    if (!adminToUpdate) return res.sendStatus(404);
    const updatedAdmin = req.body;
    const { error } = validateUpdatedAdmin(updatedAdmin);
    if (error) return res.status(400).send(error.message);
    if (updatedAdmin.password) updatedAdmin.password = encrypt(updatedAdmin.password);
    await adminToUpdate.updateOne(updatedAdmin);
    res.status(200).send("Admin information updated successfully");
});

router.get('/:id', rootAuthentication, async (req, res) =>
{
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.sendStatus(404);
    return res.status(200).send(_.pick(admin, ['_id', 'name', 'phoneNumber', 'email', 'dateOfBirth']));
});

router.get('/getAllAdmins/:pageNumber', rootAuthentication, async (req, res) => 
{
    const page = req.params.pageNumber;
    const limit = 10;
    const admins = await Admin.find({})
        .limit(limit)
        .skip((page - 1) * limit)
        .select(['name', 'phoneNumber', 'email', 'dateOfBirth']);
    if (admins.length == 0) return res.sendStatus(404);
    res.status(200).send(admins);
});
router.get('/searchForAdmin/:pageNumber/:sample', rootAuthentication, async (req, res) => 
{
    const page = req.params.pageNumber;
    const limit = 10;
    const admins = await Admin.find()
        .or([
            { name: { $regex: `.*${req.params.sample}.*`, $options: 'i' } },
            { phoneNumber: { $regex: `.*${req.params.sample}.*`, $options: 'i' } },
            { email: { $regex: `.*${req.params.sample}.*`, $options: 'i' } }
        ])
        .limit(limit)
        .skip((page - 1) * limit)
        .select(['name', 'phoneNumber', 'email', 'dateOfBirth']);
    if (!admins || admins.length == 0) return res.sendStatus(404);
    res.status(200).send(admins);
});
//exports
module.exports = router;