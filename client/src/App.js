import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes/routes';
import './index.css';

export const App = () => {

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const authoritateUser = (token, id) => {
    setToken(token);
    setUserId(id);
  }

  const logoutUser = () => {
    setToken(null);
    setUserId(null);
  }

  const routes = useRoutes(token, userId, authoritateUser, logoutUser);

  return (
    <div className='app__container'>
      <Router>
        {routes}
      </Router>
    </div>
  );
}
