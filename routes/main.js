const express = require('express');
const router = express.Router();
const mainCtrl = require('../controllers/main.js');

const auth = require('../middleware/auth');

router.get('/', auth, mainCtrl.getPosts);
router.post('/post', auth, mainCtrl.post);
router.get('/post/:id', auth, mainCtrl.getPost);
router.post('/post/:id/comment', auth, mainCtrl.commentPost);
router.get('/post/:id/comments/', auth, mainCtrl.getComments);


module.exports = router;
