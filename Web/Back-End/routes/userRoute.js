const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const { User } = require('../Database/connection');
const Joi = require('@hapi/joi');
const { compare, encrypt } = require('../helper/hash');
const _ = require('lodash');
function validateUser(user)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().required()
            .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        phoneNumber: Joi.string().regex(/^(03|70|71|76|81|78|79|86)\d{6}$/).required(),
        address: Joi.string().min(20).max(250).required(),
        dateOfBirth: Joi.date().required(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(user);
}

function validateUpdatedUser(user)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        email: Joi.string()
            .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        phoneNumber: Joi.string().regex(/^(03|70|71|76|81|78|79|86)\d{6}$/),
        address: Joi.string().min(20).max(250),
        dateOfBirth: Joi.date(),
        password: Joi.string().min(8)
    });

    return schema.validate(user);
}

//general functions
router.post('/', async (req, res) => 
{
    const recievedUser = req.body;
    const { error } = validateUser(recievedUser);
    if (error) return res.status(400).send(error.message);
    recievedUser.password = await encrypt(recievedUser.password);
    const userToadd = new User(recievedUser);
    await userToadd.save();
    res.sendStatus(201);
});

router.post('/login', async (req, res) =>
{
    const cred = req.body;
    const email = cred.email;
    const password = cred.password;
    if (!(email || password)) return res.status("400").send("Email and password are required");
    const user = await User.findOne({ email: email });
    if (!(user && await compare(password, user.password))) return res.status(404).send("Invalid email or password");
    res.status(200).send(user.generateAuthKey());
});

//admin function
router.get('/:pageNumber', adminAuth, async (req, res) => 
{
    const limit = 10;
    const pageNumber = req.params.pageNumber;
    const admins = await User
        .find({})
        .skip((pageNumber - 1) * limit)
        .limit(limit);
    if (admins.length == 0) return res.sendStatus(404);
    res.status(200).send(admins);
});

router.get('/getUserById/:id', adminAuth, async (req, res) => 
{
    const user = await User.findById(req.params.id);
    if (!user) return res.sendStatus(404);
    res.status(200).send(user);
});

router.get('/searchForUser/:pageNumber/:sample', adminAuth, async (req, res) => 
{
    const page = req.params.pageNumber;
    const limit = 10;
    const users = await User.find()
        .or([
            { name: { $regex: `.*${req.params.sample}.*`, $options: 'i' } },
            { phoneNumber: { $regex: `.*${req.params.sample}.*`, $options: 'i' } },
            { email: { $regex: `.*${req.params.sample}.*`, $options: 'i' } }
        ])
        .limit(limit)
        .skip((page - 1) * limit)
        .select(['name', 'email', 'phoneNumber', 'address', 'dateOfBirth']);
    if (!users || users.length == 0) return res.sendStatus(404);
    res.status(200).send(users);
});

router.put('/:id', adminAuth, async (req, res) => 
{
    const updatedUserInfo = req.body;
    if (updatedUserInfo.password) return res.sendStatus(400);
    const { error } = validateUpdatedUser(updatedUserInfo);
    if (error) return res.status(400).send(error.message);
    const userToUpdate = User.findById(req.params.id);
    if (!userToUpdate) return res.sendStatus(404);
    await userToUpdate.update(updatedUserInfo);
    res.sendStatus(200);
});

router.delete('/:id', adminAuth, async (req, res) =>
{
    const id = req.params.id;
    const userToDelete = await User.findOne({ _id: id });
    if (!userToDelete) return res.sendStatus(404);
    await userToDelete.deleteOne({ _id: id });
    res.status(200).send();
});

//user functions
router.get('/', userAuth, async (req, res) => 
{
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) return res.sendStatus(404);
    res.status(200).send(_.pick(user, ['name', 'email', 'phoneNumber', 'address', 'dateOfBirth']));
});

router.put('/', userAuth, async (req, res) => 
{
    const updatedUserInfo = req.body;
    const { error } = validateUpdatedUser(updatedUserInfo);
    if (error) return res.status(400).send(error.message);
    if (updatedUserInfo.password)
        updatedUserInfo.password = await encrypt(updatedUserInfo.password);
    const userToUpdate = await User.findById(req.user._id);
    if (!userToUpdate) return res.sendStatus(404);
    await userToUpdate.update(updatedUserInfo);
    res.sendStatus(200);
});

router.delete('/', userAuth, async (req, res) =>
{
    const id = req.user._id;
    const userToDelete = await User.findOne({ _id: id });
    if (!userToDelete) return res.sendStatus(404);
    await userToDelete.deleteOne({ _id: id });
    res.status(200).send();
});

module.exports = router;