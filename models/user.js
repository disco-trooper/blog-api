const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true, minlength: 1 },
  lastname: { type: String, required: true, minlength: 1 },
  username: { type: String, required: true, minlength: 1 },
  password: { type: String, required: true, minlength: 1 },
});

// Hash the password
UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password with hash
UserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Virtual for User's fullname
UserSchema.virtual('fullname').get(function() {
  return this.firstname + ' ' + this.lastname;
});

//Export model
module.exports = mongoose.model('User', UserSchema);
