import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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
        required: [true, 'password cannot be empty!']
    },
    bio: {
        type: String
    }
});

const User = model('User', userShema);

module.exports = User;