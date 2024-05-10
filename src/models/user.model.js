const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bcrypt = require('bcrypt');
const { serverConfig } = require('../config');


const userSchema = new Schema({
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
userSchema.pre('save', async function (next) {
    const user = this;

    const encryptedPassword = bcrypt.hashSync(user.password, +serverConfig.SALT_ROUNDS);//type casting through +
    user.password = encryptedPassword;
    next();
});

//adding hooks: in mongoose 'pre' middleware to encrypt password
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    // Check if the password field is being modified
    if (update.password) {
        const saltRounds = +serverConfig.SALT_ROUNDS;
        const encryptedPassword = bcrypt.hashSync(update.password, saltRounds);
        // Replace the plain text password with the encrypted one
        this.setUpdate({ ...update, password: encryptedPassword });
    }
    next();
});



const User = model('User', userSchema);

module.exports = User;