const { Currency } = require('../Database/connection');
const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const Joi = require('@hapi/joi');

function validateCurrency(currency)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        abr: Joi.string().min(3).max(3).required()
    });
    return schema.validate(currency);
}

function validateUpdatedCurrency(currency)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        abr: Joi.string().min(3).max(3)
    });
    return schema.validate(currency);
}

// general Functions
router.get('/', async (req, res) =>
{
    const currencies = await Currency.find();
    res.status(200).send(currencies);
});

router.get('/:id', async (req, res) => 
{
    const currency = await Currency.findById(req.params.id);
    if (!currency) return res.sendStatus(404);
    res.status(200).send(currency);
});

// Admin Functions
router.post('/', adminAuth, async (req, res) => 
{
    const receivedCurrency = req.body;
    const { error } = validateCurrency(receivedCurrency);
    if (error) return res.status(400).send(error.message);
    const currencyToadd = new Currency(receivedCurrency);
    await currencyToadd.save();
    res.sendStatus(200);
});

router.put('/:id', adminAuth, async (req, res) =>
{
    const updatedInfo = req.body;
    const { error } = validateUpdatedCurrency(updatedInfo);
    if (error) return res.status(400).send(error.message);
    const currencyToUpdate = Currency.findById(req.params.id);
    if (!currencyToUpdate) return res.sendStatus(404);
    await currencyToUpdate.update(updatedInfo);
    res.sendStatus(200);
});

router.delete("/:id", adminAuth, async (req, res) => 
{
    const deletedCurrency = await Currency.findByIdAndDelete(req.params.id);
    if (!deletedCurrency) return res.sendStatus(404);
    res.sendStatus(200);
});
module.exports = router;