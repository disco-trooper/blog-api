const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    default: 'Anonymous',
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

//Export model
module.exports = mongoose.model('Comment', CommentSchema);
