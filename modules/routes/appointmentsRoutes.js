const express = require('express');
const appointmentRouter = express.Router();
const { check } = require('express-validator');

const appointmentFields = [
  { key: 'fullName', eMessage: 'Поле не заполнено' },
  { key: 'doctor', eMessage: 'Поле не заполнено' },
  { key: 'date', eMessage: 'Поле не заполнено' },
  { key: 'date', eMessage: 'Неверный формат' },
  { key: 'complains', eMessage: 'Поле не заполнено' },
  { key: 'id', eMessage: 'Поле не заполнено' }
]

const checkAppData = [
  appointmentFields.map(field => {
    if (field.eMessage === 'Неверный формат') {
      return check(field.key, field.eMessage).isDate();
    }

    return check(field.key, field.eMessage).notEmpty();
  })
];

const {
  getAllAppointments,
  addAppointment,
  editAppointment,
  deleteAppointment
} = require('../controllers/appointments.controllers');

appointmentRouter.get('/getAllAppointments', getAllAppointments);
appointmentRouter.post('/addAppointment', checkAppData, addAppointment);
appointmentRouter.put('/editAppointment', editAppointment);
appointmentRouter.delete('/deleteAppointment', deleteAppointment);

module.exports = appointmentRouter;