const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

exports.profile = (req,res,next) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Unknown username.'})
            }
            Post.find({ authorId: user._id })
                .then(posts => {
                    if (!posts) {
                        res.status(200).json({
                            username: user.username,
                            name: user.name,
                            bio: user.bio,
                            posts: {}
                        }); 
                    }
                    res.status(200).json({
                        username: user.username,
                        name: user.name,
                        bio: user.bio,
                        posts: {
                            ...posts
                        }
                    });
                })
                .catch(error => res.status(500).json({error: error}));
            
        })
        .catch(error => res.status(500).json({error: error}));
};


