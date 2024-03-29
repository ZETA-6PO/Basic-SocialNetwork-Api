const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = (req,res,next) => {
    console.log(req.body);
    console.log(req.file);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                username: req.body.username,
                name: req.body.name!=null?req.body.name:req.body.username.replace('@', ''),
                bio: req.body.bio!=null?req.body.bio:"",
                profileImage: req.file!=null?`${req.protocol}://${req.get('host')}/images/${req.file.filename}`:""
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Successfully created user!' }))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req,res,next) => {
    console.log(req);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Unknown email.'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Incorect password'});
                    }
                    return res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '12h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

