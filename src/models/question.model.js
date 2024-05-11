const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title of the question cannot be null']
    },
    body: {
        type: String,
        required: [true, 'body of the question cannot be null']
    },
    topics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Topic'
        }
    ], // Reference to Topic model
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } // Reference to User model
});

const Question = model('Question', questionSchema);
module.exports = Question;
