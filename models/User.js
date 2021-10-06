const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  appointments: [{type: Types.ObjectId, ref: 'appointments'}]
});

const User = model('users', userSchema);

module.exports = User;