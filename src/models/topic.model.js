const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const topicSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Topic name cannot be null']
    }
});

const Topic = model('Topic', topicSchema);
module.exports = Topic;
