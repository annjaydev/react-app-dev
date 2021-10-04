const { Schema, model, Types } = require('mongoose');

const appointmentSchema = new Schema({
  fullName: {type: String, required: true},
  doctor: {type: String, required: true},
  data: {type: Date, required: true},
  text: {type: String, required: true},
  user: {type: Types.ObjectId, ref: 'users'}
});

const Appointment = model('appointments', appointmentSchema);

module.exports = Appointment;