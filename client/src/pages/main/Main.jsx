import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { AddForm } from '../../components/addForm/AddForm';
import { Appointments } from '../../components/appointment/Appointments';
import axios from 'axios';

export const Main = ({ id, token, logout }) => {
  const [appointments, setAppointments] = useState([]);

  const getAllAppointments = async () => {
    const result = await axios.get(`http://localhost:8000/getAllAppointments?id=${id}`);
    setAppointments(result.data);
  }

  const createAppointment = async ({ fullName, doctor, date, complains }) => {
    const result = await axios.post('http://localhost:8000/addAppointment', {
      fullName, 
      doctor, 
      date, 
      complains, 
      id
    });

    setAppointments(result.data);
  }

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <div>
      <Header title='Приемы' logout={logout} token={token} />
      <AddForm sendData={createAppointment} />
      {
        appointments.length ?
          <Appointments appointments={appointments} /> :
          'Пользователь пока что не создал ни одного приема'
      }
    </div>
  )
}
