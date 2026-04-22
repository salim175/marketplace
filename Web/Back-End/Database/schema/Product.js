const mongoose = require('mongoose');
const schema = mongoose.Schema({
    owner_id: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "categories",
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    currency_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'currencies'
    }
});

schema.methods.generateDirectoryPath =
    function ()
    {

        let path = `../front-end/src/WebsiteData/Products_Pictures/${this._id}/`;
        return path;
    }
module.exports = schema;