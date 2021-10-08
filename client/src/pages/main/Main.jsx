import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { AddForm } from '../../components/addForm/AddForm';
import { Appointments } from '../../components/appointment/Appointments';
import { FormDialog } from '../../components/formDialog/FormDialog';
import { DeleteWarning } from '../../components/deleteWarning/DeleteWarning';
import axios from 'axios';

export const Main = ({ id, token, logout }) => {

  const noAppointment = {
    fullName: '',
    doctor: '',
    date: '', 
    complains: '',
    id: ''
  };

  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(noAppointment);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

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
    await axios.put(`http://${process.env.REACT_APP_BASE_URL}/editAppointment`, {
      fullName: parameter.fullName,
      doctor: parameter.doctor,
      date: parameter.date,
      complains: parameter.complains,
      id: currentAppointment.id
    });

    await getAllAppointments(id);
    setDialogOpen(false);
    setCurrentAppointment(noAppointment);
  }

  const deleteAppointment = async () => {
    await axios.delete(
      `http://${process.env.REACT_APP_BASE_URL}/deleteAppointment?id=${currentAppointment.id}`
    );

    await getAllAppointments(id);
    setWarningOpen(false);
    setCurrentAppointment(noAppointment);
  }

  const cleanWarning = () => {
    setWarningOpen(false);
    setCurrentAppointment(noAppointment);
  }

  const cleanDialog = () => {
    setDialogOpen(false);
    setCurrentAppointment(noAppointment);
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
            setWarningOpen={setWarningOpen}
          /> :
          <div className='appointments'>
            <p>Пока что вы не подали заявку на прием ни к одному из наших врачей.</p>
            <p>Заполните все поля, зарегистрируйте прием, и все ваши данные отразятся на странице ниже.</p>
          </div>
      }
      <FormDialog
        open={dialogOpen}
        currentData={currentAppointment}
        cancelAction={cleanDialog}
        confirmAction={editAppointment}
      />

      <DeleteWarning
        openWarning={warningOpen}
        text={'Вы действительно хотите удалить прием?'}
        cancelAction={cleanWarning}
        confirmAction={deleteAppointment}
      />
    </div>
  )
}
