const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bcrypt = require('bcrypt');
const { serverConfig } = require('../config');


const userShema = new Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty!']
    },
    email: {
        type: String,
        required: [true, 'email cannot be empty!']
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty!'],
        minLength: 6,
        maxLength: 20,
        select: false
    },
    bio: {
        type: String
    }
});


//adding hooks: in mongoose 'pre' middleware to encrypt password
userShema.pre('save', async function (next) {
    const user = this;

    const encryptedPassword = bcrypt.hashSync(user.password, +serverConfig.SALT_ROUNDS);//type casting through +
    user.password = encryptedPassword;
    next();
});


const User = model('User', userShema);

module.exports = User;