const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../auth/auth');

// GET List of Posts
router.get('/', postController.getPublishedPosts);

// GET All Posts
router.get('/all', auth.verifyToken, postController.getAllPosts);

// POST New Post
router.post('/', auth.verifyToken, postController.postNewPost);

// GET Post Detail
router.get('/:id', postController.getPostDetail);

// PUT Edited Post
router.put('/:id', auth.verifyToken, postController.putEditedPost);

// DELETE Post
router.delete('/:id', auth.verifyToken, postController.deletePost);

module.exports = router;
