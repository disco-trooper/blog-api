const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../auth/auth');

// GET Comments
router.get('/', commentController.getComments);

// POST Comment
router.post('/', commentController.postNewComment);

// DELETE Comment
router.delete('/:id', auth.verifyToken, commentController.deleteComment);

module.exports = router;
