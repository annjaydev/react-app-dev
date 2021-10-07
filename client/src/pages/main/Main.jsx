import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { AddForm } from '../../components/addForm/AddForm';
import { Appointments } from '../../components/appointment/Appointments';
import { FormDialog } from '../../components/formDialog/FormDialog';
import axios from 'axios';

export const Main = ({ id, token, logout }) => {

  const noAppointment = {
    fullName: '',
    doctor: '',
    date: '',
    complains: '',
    id:''
  };

  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(noAppointment);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getAllAppointments = async (id) => {
    const result = await axios.post(`http://${process.env.REACT_APP_BASE_URL}/getAllAppointments?id=${id}`);
    setAppointments(result.data);
  }

  const createAppointment = async ({ fullName, doctor, date, complains }) => {
    const result = await axios.post(`http://${process.env.REACT_APP_BASE_URL}/addAppointment`, {
      fullName,
      doctor,
      date,
      complains,
      id
    });

    setAppointments(result.data);
  }

  const editAppointment = async (parameter) => {
    const result = await axios.put(`http://${process.env.REACT_APP_BASE_URL}/editAppointment`, {
      fullName: parameter.fullName,
      doctor: parameter.doctor,
      date: parameter.date,
      complains: parameter.complains,
      id: currentAppointment.id
    });

    await getAllAppointments(id);
    setDialogOpen(false);
  }

  useEffect(() => {
    if (id) {
      getAllAppointments(id);
    }
  }, [id]);

  return (
    <div>
      <Header title='Приемы' logout={logout} token={token} />
      <AddForm
        sendData={createAppointment}
        currentData={noAppointment}
        id='main-add-form'
      />
      {
        appointments.length > 0 ?
          <Appointments
            appointments={appointments}
            setCurrentAppointment={setCurrentAppointment}
            setDialogOpen={setDialogOpen}
          /> :
          'Пользователь пока что не создал ни одного приема'
      }
      <FormDialog
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
        currentData={currentAppointment}
        editAppointment={editAppointment}
      />
    </div>
  )
}
