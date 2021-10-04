import React from 'react';
import { Header } from '../components/Header';
import { AddForm } from '../components/AddForm';
import { Appointments } from '../components/Appointments';

export const Main = ({id, token, logout}) => {
  return (
    <div>
      <Header title='Приемы' logout={logout} token={token}/>
      <AddForm />
      <Appointments />
    </div>
  )
}
