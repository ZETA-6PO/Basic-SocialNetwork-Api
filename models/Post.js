const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
    authorId: { type: mongoose.Schema.ObjectId, ref: 'User'},
    author: { type: String, required: true },
    content: { type: String, required: true },
    postDate: { type: Date, required: true}
})

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema);