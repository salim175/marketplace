const mongoose = require('mongoose');
const jwt = require('../../helper/jsonWebToken');
const _ = require('lodash');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 16,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /(03|70|71|76|81|86)\d{6}/,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 250
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
});
schema.methods.generateAuthKey = function ()
{
    const admin = _.pick(this, ['_id', 'name', 'phoneNumber', 'email']);
    admin.isAdmin = true;
    return jwt.getToken(admin);
}

module.exports = schema;