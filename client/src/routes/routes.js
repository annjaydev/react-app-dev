import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Registration } from '../pages/registration/Registration';
import { Login } from '../pages/login/Login';
import { Main } from '../pages/main/Main';

export const useRoutes = (token, userId, authoritateUser, logout) => {

  const isAuthoritated = true;

  if (isAuthoritated) {
    return (
      <Switch>
        <Route path='/main' exact>
          <Main id={userId} token={token} logout={logout}/>
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
