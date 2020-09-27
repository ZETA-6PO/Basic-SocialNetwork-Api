const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log(decoded);
        if (req.body.userId && req.body.userId !== decoded.userId) {
            throw 'Invalid request (token::userId).'
        }else{
            next();
        }
    } catch (error) {
        res.status(401).json({error: error | 'Invalid request (token).'});
    }
}