const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const answerSchema = new Schema({
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, 'question_id cannot be null']
    },
    text: {
        type: String,
        required: [true, 'text of the answer cannot be null']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user_id cannot be null']
    } // Reference to User model
});

const Answer = model('Answer', answerSchema);
module.exports = Answer;
