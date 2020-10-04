const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:username', auth, userCtrl.profile);
router.put('/edit', auth, multer, userCtrl.editProfile)

module.exports = router;
