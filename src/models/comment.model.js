const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentSchema = new Schema({
    parent_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'parentModel'
    },
    parentModel: {
        type: String,
        required: true,
        enum: ['Answer', 'Comment']
    },
    text: {
        type: String,
        required: [true, 'text of the comment cannot be null']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user_id cannot be null']
    }
});


const Comment = model('Comment', commentSchema);
module.exports = Comment;
