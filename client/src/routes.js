import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { Main } from './pages/Main';

export const useRoutes = (token, id, authoritateUser, logout) => {

  const isAuthoritated = !!token;

  if (isAuthoritated) {
    return (
      <Switch>
        <Route path='/main' exact>
          <Main id={id} token={token} logout={logout}/>
        </Route>
        <Redirect to='/main' />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path='/registration' exact>
        <Registration onRegister={authoritateUser} />
      </Route>
      <Route path='/login' exact>
        <Login onLogin={authoritateUser} />
      </Route>
      <Redirect to='/login' />
    </Switch>
  );
}
