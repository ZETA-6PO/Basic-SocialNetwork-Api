const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

exports.post = (req, res, next) => {
    if (!req.body.userId || !req.body.content) {
        res.status(400).json({error : "Missing parameter."})
    }
    if (req.body.content.length > 200) {
        res.status(400).json({error : "Content max length reached.(200)"})
    }
    User.findOne({_id: req.body.userId})
        .then(user => {
            if (!user) {
                res.status(400).json({error : "Unknown userId."})
            }
            const post = new Post({
                authorId: user._id,
                author: user.username,
                content: req.body.content,
                postDate: Date.now()
            });
            post.save();
            res.status(201).json({message: "Post created!"});
        })
        .catch(error => res.status(400).json({error: error}));
}

exports.getPosts = (req, res, next) => {
    Post.find(Post.find({}).select('author name content postDate').sort([['postDate', -1]]))
        .then(post => {
            res.status(200).json({
                
                posts:{
                    ...post
                }
            });
        })
        .catch(error => res.status(400).json({error: error}));
};