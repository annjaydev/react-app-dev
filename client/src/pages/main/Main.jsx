import React from 'react';
import { Header } from '../../components/header/Header';
import { AddForm } from '../../components/addForm/AddForm';
import { Appointments } from '../../components/appointment/Appointments';

export const Main = ({id, token, logout}) => {

  const createAppointment = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <Header title='Приемы' logout={logout} token={token}/>
      <AddForm onSubmit={createAppointment}/>
      <Appointments />
    </div>
  )
}
