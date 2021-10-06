import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/Header';
import DomainOutlined from '@material-ui/icons/DomainOutlined';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import axios from 'axios';

export const Registration = ({ onRegister }) => {
  const [loading, setLoading] = useState(false);
  const [warnText, setWarnText] = useState('');
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    passwordRepeat: ''
  });

  const checkLength = /[A-Za-z\d]{6,20}/;
  const checkLang = /^[A-Za-z\d]+$/;
  const checkContent = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;

  const isLoginValid = () => {
    if (!formData.login || !checkLength.test(formData.login)) {
      return false;
    }

    return true;
  }

  const isPasswordValid = () => {
    if (!checkContent.test(formData.password)
      || !checkLength.test(formData.password)
      || !checkLang.test(formData.password)) {

      return false;
    }
    return true;
  }

  const isPasswordRepMatch = () => {
    if (!formData.passwordRepeat
      || formData.passwordRepeat !== formData.password) {

      return false;
    }
    return true;
  }

  const clearState = (name) => {
    setFormData({ ...formData, [name]: '' });
  }

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const registerHandler = async () => {
    const body = { ...formData };

    try {
      setWarnText('');

      if (!formData.login
        || !formData.password
        || !formData.passwordRepeat) {
        setWarnText('Заполните все поля');
      } else if (!isPasswordRepMatch()) {
        setFormData({ ...formData, password: '', passwordRepeat: '' });
        setWarnText('Пароли не совпадают');
      } else {
        setLoading(true);
        await axios.post(`http://${process.env.REACT_APP_BASE_URL}/registration`, body)
          .then(result => {
            if (result.data.error) {
              setWarnText(result.data.error);
            } else {
              onRegister(result.data.token, result.data.id);
            }
          });

        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      if (!isLoginValid()) {
        clearState('login');
        setWarnText('Длина логина - 6-20 символов.');
      } else if (!isPasswordValid()) {
        setFormData({ ...formData, password: '', passwordRepeat: '' });
        setWarnText('Пароль может состоять только из латинских букв и обязательно должен включать в себя 1 букву и 1 цифру. Длина пароля - 6-20 символов');
      }
    }
  }

  const sendFormData = (e) => {
    e.preventDefault();
    registerHandler();
  }

  return (
    <div>
      <Header title='Зарегистрироваться' />
      <div className='auth-page'>

        <DomainOutlined
          className='auth-page__img'
          style={{ fontSize: 450 }}
        />

        <form
          className='auth-page__form'
          onSubmit={(e) => sendFormData(e)}>

          <h3 className='auth-page__title'>Регистрация</h3>
          <div className='warning-field'>
            {warnText &&
              <>
                <ErrorOutline
                  className='warning-icon'
                  style={{ fontSize: 18, color: 'red' }}
                />
                {warnText}
              </>
            }
          </div>

          <label>Login</label>
          <input
            className='auth-page__input'
            type='text'
            placeholder='Login'
            name='login'
            value={formData.login}
            onChange={(e) => changeHandler(e)}
          />
          <label>Password</label>
          <input
            className='auth-page__input'
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={(e) => changeHandler(e)}
          />
          <label>Repeat password</label>
          <input
            className='auth-page__input'
            type='password'
            placeholder='Password'
            name='passwordRepeat'
            value={formData.passwordRepeat}
            onChange={(e) => changeHandler(e)}
          />

          <button
            className='auth-page__btn'
            type='submit'
            disabled={loading}
          >Зарегистрироваться</button>

          <Link className='change-auth-btn ' to='/login'>Авторизоваться</Link>
        </form>
      </div>
    </div>
  )
}
