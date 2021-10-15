import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/Header';
import DomainOutlined from '@material-ui/icons/DomainOutlined';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { warningMessages } from '../../utils/collections';
import axios from 'axios';

const checkLength = /[A-Za-z\d]{6,20}/;
const checkLang = /^[A-Za-z\d]+$/;
const checkContent = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;

const url = `http://${process.env.REACT_APP_BASE_URL}/auth`;

export const Registration = ({ onRegister }) => {
  const [loading, setLoading] = useState(false);
  const [warnText, setWarnText] = useState('');
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    passwordRepeat: ''
  });

  const isLoginValid = () => {
    const check = !formData.login || !checkLength.test(formData.login);
    return !check;
  }

  const isPasswordValid = () => {
    const check = !checkContent.test(formData.password)
    || !checkLength.test(formData.password)
    || !checkLang.test(formData.password);
    return !check;
  }

  const isPasswordRepMatch = () => {
    const check = !formData.passwordRepeat || formData.passwordRepeat !== formData.password;
    return !check;
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

      if (!formData.login || !formData.password || !formData.passwordRepeat) {
        setWarnText(warningMessages.emptyField);
      } else if (!isPasswordRepMatch()) {
        setFormData({ ...formData, password: '', passwordRepeat: '' });
        setWarnText(warningMessages.passwordRepeat);
      } else {
        setLoading(true);
        await axios.post(`${url}/registration`, body)
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
        setWarnText(warningMessages.loginLength);
      } else if (!isPasswordValid()) {
        setFormData({ ...formData, password: '', passwordRepeat: '' });
        setWarnText(warningMessages.passwordCheck);
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
        />

        <form
          className='auth-page__form'
          autoComplete='new-password'
          onSubmit={(e) => sendFormData(e)}>

          <h3 className='auth-page__title'>Регистрация</h3>
          <div className='warning-field'>
            {warnText &&
              <>
                <ErrorOutline className='warning-icon' />
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
            className='auth-page__btn pointer'
            type='submit'
            disabled={loading}
          >Зарегистрироваться</button>

          <Link className='change-auth-btn ' to='/login'>Авторизоваться</Link>
        </form>
      </div>
    </div>
  )
}
