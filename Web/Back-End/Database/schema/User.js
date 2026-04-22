const mongoose = require('mongoose');
const jwt = require('../../helper/jsonWebToken');
const _ = require('lodash');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /(03|70|71|76|81|78|79|86)\d{6}/,
        trim: true
    },
    address: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 250
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.methods.generateAuthKey =
    function ()
    {
        const user = _.pick(this, ['_id', 'phoneNumber', 'email']);
        user.isAdmin = false;
        return jwt.getToken(user);
    }
module.exports = schema;