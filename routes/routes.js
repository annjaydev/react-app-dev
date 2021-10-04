const Router = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = new Router();

const generateToken = (id) => {
  const payload = {
    id
  };

  return jwt.sign(
    payload,
    config.get('secret'),
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
      res.json({error: 'Что-то пошло не так, поробуйте снова'});
    }
  });

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
  });

module.exports = router;
