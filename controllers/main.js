const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
exports.post = (req, res, next) => {
    if (!req.body.userId || !req.body.content) {
        return res.status(400).json({error : "Missing parameter."})
    }
    if (req.body.content.length > 200) {
        return res.status(400).json({error : "Content max length reached.(200)"})
    }
    User.findOne({_id: req.body.userId})
        .then(user => {
            if (!user) {
                return res.status(400).json({error : "Unknown userId."})
            }
            const post = new Post({
                authorId: user._id,
                author: user.username,
                content: req.body.content,
                postDate: Date.now()
            });
            post.save();
            return res.status(201).json({message: "Post created!"});
        })
        .catch(error => res.status(400).json({error: error}));
}

exports.getPosts = (req, res, next) => {
    Post.find({}).select('author name content postDate').sort([['postDate', -1]])
        .then(post => {
            return res.status(200).json({
                posts:{
                    ...post
                }
            });
        })
        .catch(error => res.status(400).json({error: error}));
};

exports.getPost = (req, res , next) => {
    Post.findOne({_id: req.params.id}).select('_id authorId author content postDate comments')
        .then(post =>  {
            if (!post) {
                return res.status(404).json({error: 'Unknown post id.'})
            }
            return res.status(201).json({
                ...post._doc
            });
        })
        .catch(error => res.status(400).json({error: error}));
};
exports.commentPost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(post => {
            if (!post) {
                return res.status(404).json({error: 'Unknown post.'});
            }
            commentObj = new Comment(
                {
                    authorId: req.body.userId,
                    post: post._id,
                    content: req.body.content,
                    postDate: Date.now()
                }
            )
            commentObj.save();
            res.status(201).json({message: 'Commented succesfully.'});
        })
        .catch(error => res.status(400).json({error: error}));
}
exports.getComments = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(post=>{
            if(!post) {
                return res.status(404).json({error: 'Unknown post id.'});
            }
            Comment.find({post: req.params.id})
                .then(comments => {
                    res.status(200).json({
                        ...comments
                    })
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
};