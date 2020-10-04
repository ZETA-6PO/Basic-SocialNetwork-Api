const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    profileImage: {type: String, required: false},
    bio: {type: String, required: false}
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);