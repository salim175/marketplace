const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 2000
    },
});
module.exports = schema;