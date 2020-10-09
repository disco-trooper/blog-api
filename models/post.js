const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  public: { type: Boolean, default: false, enum: [true, false] },
});

//Export model
module.exports = mongoose.model('Post', PostSchema);
