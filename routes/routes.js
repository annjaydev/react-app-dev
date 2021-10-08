const Router = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

const router = new Router();

const appointmentFields = [
  {key: 'fullName', eMessage: 'Поле не заполнено'},
  {key: 'doctor', eMessage: 'Поле не заполнено'},
  {key: 'date', eMessage: 'Поле не заполнено'},
  {key: 'date', eMessage: 'Неверный формат'},
  {key: 'complains', eMessage: 'Поле не заполнено'},
  {key: 'id', eMessage: 'Поле не заполнено'}
]

const generateToken = (id) => {
  const payload = {
    id
  };

  return jwt.sign(
    payload,
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
}

router.post(
  '/registration',
  [
    check('login', 'Минимальная длина логина - 6 символов').isLength({ min: 6 }),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({ min: 6 }),
    check('password', 'Пароль должен содержать хотя бы одну цифру').matches(/\d/),
    check('password', 'Пароль должен содержать хотя бы одну букву').matches(/[A-Za-z]/),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const { login, password } = req.body;
      const userFounded = await User.findOne({ login });

      if (userFounded) {
        return res.json({ error: 'Логин занят' });
      }

      const hashPassword = await bcrypt.hash(password, 7);
      const user = new User({
        login,
        password: hashPassword
      });

      await user.save();

      const token = generateToken(user._id);

      return res.status(201).json({
        token,
        id: user._id,
        message: 'Пользователь зарегистрирован'
      });

    } catch (e) {
      res.json({ error: 'Что-то пошло не так, поробуйте снова' });
    }
  }
);

router.post(
  '/login',
  [
    check('login', 'Введите логин').notEmpty(),
    check('password', 'Введите пароль').notEmpty()
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        });
      }

      const { login, password } = req.body;
      const userFounded = await User.findOne({ login });

      if (!userFounded) {
        return res.json({ error: 'Неверно введен логин или пароль' });
      }

      const isMatchPassword = await bcrypt.compare(password, userFounded.password);

      if (!isMatchPassword) {
        return res.json({ error: 'Неверно введен логин или пароль' });
      }

      const token = generateToken(userFounded._id);

      res.json({
        token,
        id: userFounded._id,
        message: 'Пользователь вошел в систему'
      });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка авторизации' });
    }
  }
);

router.post(
  '/addAppointment',
  [
    appointmentFields.map(field => {
      if (field.eMessage === 'Неверный формат') {
        return check(field.key, field.eMessage).isDate();
      }

      return check(field.key, field.eMessage).notEmpty();
    })
  ],
  async (req, res) => {
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

    const result = await User.findOne({_id: id}).populate('appointments');
    res.send(result.appointments);
  }
);

router.post(
  '/getAllAppointments',
  async (req, res) => {
    const id = req.query.id;

    if (!id) {
      res.status(400).send('Что-то пошло не так.')
    }

    const result = await User.findOne({_id: id}).populate('appointments');
    res.send(result.appointments);
  }
);  

router.put('/editAppointment', async (req, res) => {
  const {fullName, doctor, date, complains, id} = req.body;

  if (!fullName || !doctor || !date || !complains || !id) {
    res.json({ error: 'Заполните все поля' });
  }

  let editingAppointment = await Appointment.findOne({_id: id});

  fullName ? editingAppointment.fullName = fullName : editingAppointment.fullName;
  doctor ? editingAppointment.doctor = doctor : editingAppointment.doctor;
  date ? editingAppointment.date = date : editingAppointment.date;
  complains ? editingAppointment.complains = complains : editingAppointment.complains;
  
  await editingAppointment.save();

  res.send(editingAppointment);
});

module.exports = router;
