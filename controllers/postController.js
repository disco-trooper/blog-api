const debug = require('debug')('postController');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Post = require('../models/post');
const Comment = require('../models/comment');

// GET Published Posts
exports.getPublishedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ public: true });
    res.json(posts);
  } catch (error) {
    debug(error);
    next(createError(500));
  }
};

// GET All Posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    debug(error);
    next(createError(500));
  }
};

// POST New Post
exports.postNewPost = async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    timestamp: Date.now(),
    text: req.body.text,
    public: req.body.public,
    author: jwt.decode(req.token).user._id,
  });
  try {
    await post.save();
    res.status(201);
    res.send();
  } catch (error) {
    debug(error);
    next(createError(500));
  }
};

// GET Post Detail
exports.getPostDetail = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    debug(error);
    next(createError(500));
  }
};

// PUT Edited Post
exports.putEditedPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      public: req.body.public,
      author: jwt.decode(req.token).user._id,
      _id: req.params.id,
    });
    await Post.findByIdAndUpdate(req.params.id, post);
    res.status(201);
    res.send();
  } catch (error) {
    debug(error);
    next(createError(500));
  }
};

// DELETE Post
exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ post_id: req.params.id });
    res.status(200);
    res.send();
  } catch (error) {
    debug(error);
    next(createError(500));
  }
};
