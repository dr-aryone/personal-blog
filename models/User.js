const mongoose = require('mongoose');
const { jwtPrivateKey } = require('../config/keys.js');
const jwt = require('jsonwebtoken');
const Joi = require('joi');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});


// here we can add a method to our userSchema - in this function 'this' represents the user
// this function is creating a json web token for the user
UserSchema.methods.generateAuthToken = function () {
    // the object within jwt.sign is the payload that the jwt returns
    const token = jwt.sign({ _id: this._id }, jwtPrivateKey);
    return token;
}

function validateUser(user) {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(255)
            .required(),
        email: Joi.string()
            .required()
            .min(5)
            .max(255)
            .email(),
        password: Joi.string()
            .min(6)
            .max(50)
            .required()
    };

    return Joi.validate(user, schema);
}


const User = mongoose.model('User', UserSchema);

module.exports.User = User;
module.exports.validate = validateUser;