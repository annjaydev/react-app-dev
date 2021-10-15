const mongoose = require('mongoose');
const Appointment = require('../../models/Appointment');
const User = require('../../models/User');
const { validationResult } = require('express-validator');

const getAllAppointments = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.status(400).send('Что-то пошло не так.')
  }

  const result = await User.findOne({_id: id}).populate('appointments');
  res.send(result.appointments);
}

const addAppointment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: 'Заполнены не все поля для создания нового приема'
    });
  }

  const { fullName, doctor, date, complains, id } = req.body;

  const userFounded = await User.findOne({ _id: id });

  const newAppointment = new Appointment({
    _id: new mongoose.Types.ObjectId(),
    fullName,
    doctor,
    date,
    complains
  });

  await newAppointment.save();

  userFounded.appointments.push(newAppointment._id);
  await userFounded.save();

  const result = await User.findOne({ _id: id }).populate('appointments');
  res.send(result.appointments);
}

const editAppointment = async (req, res) => {
  const {fullName, doctor, date, complains, id} = req.body;
  const missedField = !fullName || !doctor || !date || !complains || !id;

  if (missedField) {
    res.status(400).json({ error: 'Заполните все поля' });
  }

  let editingAppointment = await Appointment.findOne({_id: id});

  fullName ? editingAppointment.fullName = fullName : editingAppointment.fullName;
  doctor ? editingAppointment.doctor = doctor : editingAppointment.doctor;
  date ? editingAppointment.date = date : editingAppointment.date;
  complains ? editingAppointment.complains = complains : editingAppointment.complains;
  
  await editingAppointment.save();

  res.send(editingAppointment);
}

const deleteAppointment = async (req, res) => {
  const {id} = req.query;

  if (!id) {
    res.status(400).json({ error: 'Некорректные параметры' });
  }

  await Appointment.deleteOne({_id: id});

  res.send('Прием отменен');
}

module.exports = {
  getAllAppointments,
  addAppointment,
  editAppointment,
  deleteAppointment
};

