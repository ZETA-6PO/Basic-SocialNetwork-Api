const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/home.js');

const auth = require('../middleware/auth');

router.get('/', auth, homeCtrl.getPosts);
router.post('/post', auth, homeCtrl.post);



module.exports = router;
