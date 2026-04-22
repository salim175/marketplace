const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    abr: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 3
    }
});
module.exports = schema;