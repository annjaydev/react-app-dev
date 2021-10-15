const express = require('express');
const authRouter = express.Router();
const { check } = require('express-validator');

const checkLoginConst = [
  check('login', 'Минимальная длина логина - 6 символов').isLength({ min: 6 }),
  check('password', 'Минимальная длина пароля - 6 символов').isLength({ min: 6 }),
  check('password', 'Пароль должен содержать хотя бы одну цифру').matches(/\d/),
  check('password', 'Пароль должен содержать хотя бы одну букву').matches(/[A-Za-z]/)
];

const checkRegistrationConst = [
  check('login', 'Введите логин').notEmpty(),
  check('password', 'Введите пароль').notEmpty()
];

const {
  loginUser,
  registerUser
} = require('../controllers/auth.controllers');

authRouter.post('/registration', checkRegistrationConst, registerUser);
authRouter.post('/login', checkLoginConst, loginUser);

module.exports = authRouter;