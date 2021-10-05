const { Schema, model} = require('mongoose');

const appointmentSchema = new Schema({
  fullName: {type: String, required: true},
  doctor: {type: String, required: true},
  date: {type: Date, required: true},
  complains: {type: String, required: true}
});

const Appointment = model('appointments', appointmentSchema);

module.exports = Appointment;