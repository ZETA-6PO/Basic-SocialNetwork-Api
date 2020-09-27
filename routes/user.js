const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js');

const auth = require('../middleware/auth');

router.get('/:username', auth, userCtrl.profile);


module.exports = router;
