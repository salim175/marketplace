const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const Joi = require('@hapi/joi');
const { Product } = require('../Database/connection');
Joi.objectId = require('joi-objectid')(Joi);
const _ = require('lodash');
const { number } = require('@hapi/joi');
const fs = require('fs');
const path = require("path");
function validateProduct(product)
{
    const schema = Joi.object({
        owner_id: Joi.objectId().required(),
        category_id: Joi.objectId().required(),
        currency_id: Joi.objectId().required(),
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(10).max(2000).required(),
        price: Joi.number().required(),
        location: Joi.string().required()
    });
    return schema.validate(product);
}

function validateUpdateProduct(product)
{
    const schema = Joi.object({
        owner_id: Joi.objectId(),
        category_id: Joi.objectId(),
        currency_id: Joi.objectId(),
        name: Joi.string().min(3).max(50),
        description: Joi.string().min(10).max(2000),
        price: Joi.number(),
        location: Joi.string()
    });
    return schema.validate(product);
}

async function getProductImages(product)
{
    dir = path.resolve(product.generateDirectoryPath() + "/");//jebt lpath taba3 lfolder
    const productFiles = fs.readdirSync(dir);//jib kol lfilet
    const filesPath = [];
    productFiles.map(file => { filesPath.push(`${file}`) });//hawelon la string 
    return filesPath;
}

function getPlainObject(product)
{
    return product = _.pick(product, ['_id', 'category_id', 'currency_id', 'name', 'description', 'price', 'location', 'owner_id']);
}

router.post('/', userAuth, async (req, res) =>
{
    if (!req.files)
    {
        res.status(400).send("There is no file to save!")
    } else
    {
        let recievedProduct = JSON.parse(req.body.data);
        recievedProduct.owner_id = req.user._id;
        const { error } = validateProduct(recievedProduct);
        if (error) return res.status(400).send(error.message);
        const productToAdd = new Product(recievedProduct);
        await productToAdd.save();
        const D_ID = productToAdd._id;
        // loop throught all files
        if (Array.isArray(req.files.images))
        {
            _.forEach(_.keysIn(req.files.images), (key) =>
            {
                let photo = req.files.images[key];
                let path = `../front-end/src/WebsiteData/Products_Pictures/${D_ID}/${photo.name}`;
                photo.mv(`${path}`);//mv=move
            });
        }
        else
        {
            const file = req.files.images;
            let path = `../front-end/src/WebsiteData/Products_Pictures//${D_ID}/${file.name}`;
            file.mv(`${path}`);
        }
        //return response
        res.status(200).send('Files are uploaded');
    }
});


router.delete("/admin/:id", adminAuth, async (req, res) => 
{
    const productToDelete = await Product.findById(req.params.id);
    if (!productToDelete) return res.sendStatus(404);
    productToDelete.delete();
    dir = path.resolve(productToDelete.generateDirectoryPath() + "/");
    fs.rmSync(dir, { recursive: true, force: true });
    res.sendStatus(200);
});

router.get("/getProductByid/:id", async (req, res) =>
{
    let product = await Product.findById(req.params.id);
    if (!product) return res.sendStatus(404);
    const files = await getProductImages(product);
    product = getPlainObject(product);
    product.files = files;
    res.status(200).send(product);
});

router.get("/:page", async (req, res) => 
{
    const limit = 15;
    const page = req.params.page;
    let products = await Product.find({}).skip((page - 1) * limit).limit(limit).populate('category_id').populate('owner_id', ['_id', 'name', 'phoneNumber', 'email', 'address']).populate('currency_id');
    if (!products) return res.sendStatus(404);
    const results = [];
    await products.forEach(async (product) =>
    {
        const files = await getProductImages(product);
        product = getPlainObject(product);
        product.files = files;
        results.push(product);
    })
    res.status(200).send(results);
});

router.get("/:category/:page", async (req, res) => 
{
    const limit = 15;
    const page = req.params.page;
    let products = await Product.find({ category_id: req.params.category }).skip((page - 1) * limit).limit(limit).populate('category_id').populate('owner_id', ['_id', 'name', 'phoneNumber', 'email', 'address']).populate('currency_id');
    if (!products) return res.sendStatus(404);
    const results = [];
    await products.forEach(async (product) =>
    {
        const files = await getProductImages(product);
        product = getPlainObject(product);
        product.files = files;
        results.push(product);
    })
    res.status(200).send(results);
});

router.get("/search/:sample/:page", async (req, res) => 
{
    const limit = 15;
    const page = req.params.page;
    let products = await Product.find()
        .or([
            { location: { $regex: req.params.sample, $options: 'i' } },
            { name: { $regex: req.params.sample, $options: 'i' } },
            { description: { $regex: req.params.sample, $options: 'i' } },
        ])
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('category_id').populate('owner_id', ['_id', 'name', 'phoneNumber', 'email', 'address']).populate('currency_id');
    if (!products) return res.sendStatus(404);
    const results = [];
    await products.forEach(async (product) =>
    {
        const files = await getProductImages(product);
        product = getPlainObject(product);
        product.files = files;
        results.push(product);
    })
    res.status(200).send(results);
});
router.get("/user/product/:page", userAuth, async (req, res) => 
{
    const limit = 15;
    const page = req.params.page;
    let products = await Product.find({ owner_id: req.user._id }).skip((page - 1) * limit).limit(limit).populate('category_id').populate('owner_id', ['_id', 'name', 'phoneNumber', 'email', 'address']).populate('currency_id');
    if (!products) return res.sendStatus(404);
    const results = [];
    await products.forEach(async (product) =>
    {
        const files = await getProductImages(product);
        product = getPlainObject(product);
        product.files = files;
        results.push(product);
    })
    res.status(200).send(results);
});

router.put("/update/product/:id", userAuth, async (req, res) => 
{
    const productToUpdate = await Product.findById(req.params.id);
    if (!productToUpdate) return res.sendStatus(404);
    if (productToUpdate.owner_id != req.user._id) return res.sendStatus(401);
    await productToUpdate.update(req.body);
    res.sendStatus(200);
});

router.delete("/user/:id", userAuth, async (req, res) =>
{
    const productToDelete = await Product.findById(req.params.id);
    if (!productToDelete) return res.sendStatus(404);
    if (productToDelete.owner_id != req.user._id) return res.sendStatus(401);
    productToDelete.delete();
    dir = path.resolve(productToDelete.generateDirectoryPath() + "/");
    fs.rmSync(dir, { recursive: true, force: true });
    res.sendStatus(200);
});
module.exports = router;