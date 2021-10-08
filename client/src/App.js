import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes/routes';
import Cookies from 'js-cookie';
import './index.css';

export const App = () => {

  const [token, setToken] = useState(Cookies.get('token'));
  const [userId, setUserId] = useState(Cookies.get('id'));

  const authoritateUser = (token, id) => {
    setToken(token);
    setUserId(id);
    Cookies.set('token', token);
    Cookies.set('id', id);
  }

  const logoutUser = async () => {
    setToken(null);
    setUserId(null);
    Cookies.remove('token', {path: '/'});
    Cookies.remove('id', {path: '/'});
  }

  const routes = useRoutes(token, userId, authoritateUser, logoutUser);

  return (
    <div className='app__container'>
      <Router>
        {
          routes
        }
      </Router>
    </div>
  );
}
