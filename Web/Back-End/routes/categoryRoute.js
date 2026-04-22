const { Category } = require('../Database/connection');
const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const Joi = require('@hapi/joi');
function validateCategory(category)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(20).max(2000).required()
    });
    return schema.validate(category);
}

function validateUpdatedCategory(category)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50),
        description: Joi.string().min(20).max(2000)
    });
    return schema.validate(category);
}

// general Functions
router.get('/', async (req, res) =>
{
    const categories = await Category.find();
    res.status(200).send(categories);
});

router.get('/:id', async (req, res) => 
{
    const category = await Category.findById(req.params.id);
    if (!category) return res.sendStatus(404);
    res.status(200).send(category);
});

// admin Functions
router.post('/', adminAuth, async (req, res) => 
{
    const receivedCategory = req.body;
    const { error } = validateCategory(receivedCategory);
    if (error) return res.status(400).send(error.message);
    const categoryToadd = new Category(receivedCategory);
    await categoryToadd.save();
    res.sendStatus(200);
});

router.put('/:id', adminAuth, async (req, res) =>
{
    const updatedInfo = req.body;
    const { error } = validateUpdatedCategory(updatedInfo);
    if (error) return res.status(400).send(error.message);
    const categoryToUpdate = Category.findById(req.params.id);
    if (!categoryToUpdate) return res.sendStatus(404);
    await categoryToUpdate.update(updatedInfo);
    res.sendStatus(200);
});

router.delete("/:id", adminAuth, async (req, res) => 
{
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.sendStatus(404);
    res.sendStatus(200);
});

module.exports = router;