const { body, validationResult } = require('express-validator');
const debug = require('debug')('commentController');
const createError = require('http-errors');
const Comment = require('../models/comment');

// GET Comments
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post_id: req.post_id });
    res.json(comments);
  } catch (error) {
    debug(error);
    next(createError(500));
  }
};

// POST Comment
exports.postNewComment = [
  body('author')
    .custom((value) => {
      if (value) {
        return value.length >= 2 && value.length <= 25;
      }
      return true;
    })
    .withMessage('Name must be between 2 and 25 characters long')
    .escape(),
  body('text').trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      debug(errors.array());
      next(createError(500));
    }
    try {
      const comment = new Comment({
        author: req.body.author ? req.body.author : 'Anonymous',
        text: req.body.text,
        timestamp: Date.now(),
        post_id: req.post_id,
      });
      await comment.save();
      res.status(201);
      res.send();
    } catch (error) {
      debug(error);
      next(createError(500));
    }
  },
];

// DELETE Comment
exports.deleteComment = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200);
    res.send();
  } catch (error) {
    debug(error);
    next(createError(500));
  }
};
