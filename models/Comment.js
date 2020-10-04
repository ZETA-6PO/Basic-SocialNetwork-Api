const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = mongoose.Schema({
    authorId: { type: mongoose.Schema.ObjectId, ref: 'User'},
    post: { type: mongoose.Schema.ObjectId, ref: 'Post'},
    content: { type: String, required: true },
    postDate: { type: Date, required: true},
})

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', commentSchema);