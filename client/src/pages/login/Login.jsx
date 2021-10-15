import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/Header';
import DomainOutlined from '@material-ui/icons/DomainOutlined';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { warningMessages } from '../../utils/collections';
import axios from 'axios';

const url = `http://${process.env.REACT_APP_BASE_URL}/auth`;

export const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [warnText, setWarnText] = useState('');
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  const isLoginFilled = () => {
    return formData.login.length ? true : false;
  }

  const isPasswordFilled = () => {
    return formData.password.length ? true : false;
  }

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const loginHandler = async () => {
    const body = { ...formData };

    try {
      setWarnText('');
      setLoading(true);

      await axios.post(`${url}/login`, body)
        .then(result => {
          if (result.data.error) {
            setWarnText(result.data.error);
          } else {
            onLogin(result.data.token, result.data.id);
          }
        });

      setLoading(false);

    } catch (e) {
      setLoading(false);

      if (!isLoginFilled()) {
        setWarnText(warningMessages.emptyField);
      } else if (!isPasswordFilled()) {
        setWarnText(warningMessages.emptyField);
      }
    }
  }

  const sendFormData = (e) => {
    e.preventDefault();
    loginHandler();
  }

  return (
    <div>
      <Header title='Войти в систему' />

      <div className="auth-page">
        <DomainOutlined
          className='auth-page__img'
        />

        <form
          className='auth-page__form'
          autoComplete='new-password'
          onSubmit={(e) => sendFormData(e)}
        >
          <h3 className='auth-page__title'>Войти в систему</h3>
          <div className='warning-field'>
            {warnText &&
              <>
                <ErrorOutline className='warning-icon' />
                {warnText}
              </>
            }
          </div>

          <label>Введите логин</label>
          <input
            className='auth-page__input'
            type='text'
            placeholder="Login"
            name='login'
            onChange={(e) => changeHandler(e)}
          />

          <label>Введите пароль</label>
          <input
            className='auth-page__input'
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => changeHandler(e)}
          />

          <button
            className='auth-page__btn pointer'
            type='submit'
            disabled={loading}
          >
            Войти
          </button>

          <Link className='change-auth-btn ' to='/registration'>Зарегистрироваться</Link>
        </form>
      </div>
    </div>
  )
}
