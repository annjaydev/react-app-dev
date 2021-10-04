import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import DomainOutlined from '@material-ui/icons/DomainOutlined';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import axios from 'axios';

export const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [warnText, setWarnText] = useState('');
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  const isLoginFilled = () => {
    if (formData.login.length !== 0) {
      return true;
    }
    return false;
  }

  const isPasswordFilled = () => {
    if (formData.password.length !== 0) {
      return true;
    }
    return false;
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

      await axios.post('http://localhost:8000/login', body)
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
        setWarnText('Заполните поле логина');
      } else if (!isPasswordFilled()) {
        setWarnText('Заполните поле пароля');
      }
    }

    const result = await axios.post('http://localhost:8000/login', body);
    console.log(result.data.message);
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
          style={{ fontSize: 450 }}
        />

        <form
          className='auth-page__form'
          onSubmit={(e) => sendFormData(e)}
        >
          <h3 className='auth-page__title'>Войти в систему</h3>
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
            className='auth-page__btn'
            type='submit'
            disabled={loading}
          >Войти</button>

          <Link className='change-auth-btn ' to='/registration'>Зарегистрироваться</Link>
        </form>
      </div>
    </div>
  )
}
