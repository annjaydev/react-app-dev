const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = model('users', userSchema);

module.exports = User;