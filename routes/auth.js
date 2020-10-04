const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.js');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const showRequest = require('../middleware/showRequest.js');

router.post('/register', multer, authCtrl.register);
router.post('/login', authCtrl.login);


module.exports = router;
