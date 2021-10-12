import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { AddForm } from '../../components/addForm/AddForm';
import { Appointments } from '../../components/appointment/Appointments';
import { SortSelector } from '../../components/sortSelector/SortSelector';
import { FormDialog } from '../../components/formDialog/FormDialog';
import { DeleteWarning } from '../../components/deleteWarning/DeleteWarning';
import { DateFilter } from '../../components/dateFilter/DateFilter';
import { sortBy } from 'lodash';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from 'axios';
import './index.scss';

export const Main = ({ id, token, logout }) => {

  const noAppointment = {
    fullName: '',
    doctor: '',
    date: '',
    complains: '',
    id: ''
  };

  const sortCollection = [
    { id: '1ci1', value: 'Имя' },
    { id: '1ci2', value: 'Врач' },
    { id: '1ci3', value: 'Дата' },
    { id: '1ci4', value: 'Отменить' }
  ];

  const sortDirectionColl = [
    { id: '2ci1', value: 'По возрастанию' },
    { id: '2ci2', value: 'По убыванию' }
  ];

  const [appointments, setAppointments] = useState([]);
  const [appointmentsCopy, setAppointmentsCopy] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(noAppointment);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const [sortValue, setSortValue] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [showSortDirection, setShowDirection] = useState('');

  const [showFilter, setShowFilter] = useState(false);
  const [datesPeriod, setDatesPeriod] = useState([{
    dateFrom: '',
    dateTo: ''
  }]);

  const getAllAppointments = async (id) => {
    const result = await axios.post(`http://${process.env.REACT_APP_BASE_URL}/getAllAppointments?id=${id}`);

    return result.data;
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
    }).then(async res => {
      await getAllAppointments(id).then(res => setAppointments(res));
      setDialogOpen(false);
      setCurrentAppointment(noAppointment);
    });
  }

  const deleteAppointment = async () => {
    await axios.delete(
      `http://${process.env.REACT_APP_BASE_URL}/deleteAppointment?id=${currentAppointment.id}`
    );

    await getAllAppointments(id).then(res => setAppointments(res));
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

  const sortByProp = (direction, prop) => {
    let result = null;

    if (direction === 'asc') {
      result = sortBy(appointments, (item) => item[prop]);
    } else if (direction === 'desc') {
      result = sortBy(appointments, (item) => item[prop]).reverse();
    }
    
    setAppointments(result);
  }

  const filterByDates = () => {
    return appointmentsCopy.filter(appointment => 
      appointment.date >= datesPeriod.dateFrom &&
      appointment.date <= datesPeriod.dateTo
    );
  }

  const cancelFilter = () => {
    setAppointments(appointmentsCopy);
    setShowFilter(false);
  }

  useEffect(() => {
    if (id) {
      getAllAppointments(id)
        .then(res => {
          setAppointments(res);
          setAppointmentsCopy(res);
        });
    }
  }, []);

  useEffect(() => {
    if (sortValue && sortValue !== 'Отменить') {
      setShowDirection(true);
    } else if (sortValue === 'Отменить') {
      setShowDirection(false);
      setSortDirection('');
      setAppointments(appointmentsCopy);
    }
  }, [sortValue]);

  useEffect(() => {
    if (sortDirection && sortDirection === 'По возрастанию') {
      if (sortValue === 'Имя') sortByProp('asc', 'fullName');
      else if (sortValue === 'Врач') sortByProp('asc', 'doctor');
      else if (sortValue === 'Дата') sortByProp('asc', 'date');

    } else if (sortDirection && sortDirection === 'По убыванию') {
      if (sortValue === 'Имя') sortByProp('desc', 'fullName');
      else if (sortValue === 'Врач') sortByProp('desc', 'doctor');
      else if (sortValue === 'Дата') sortByProp('desc', 'date');
    }
  }, [sortDirection, sortValue]);

  useEffect(() => {
    setAppointments(filterByDates());
  }, [datesPeriod])

  return (
    <div>
      <Header title='Приемы' logout={logout} token={token} />
      <AddForm
        sendData={createAppointment}
        currentData={noAppointment}
        id='main-add-form'
      />

      <div className='sort-block'>
        <SortSelector
          labelText='Сортировать по:'
          collection={sortCollection}
          changeFilterValue={setSortValue}
        />

        {
          showSortDirection &&
          <SortSelector
            labelText='Направление:'
            collection={sortDirectionColl}
            changeFilterValue={setSortDirection}
          />
        }

        { !showFilter && <div className='filter-activator'>
          <p className='common-text'>Добавить фильтр по дате: </p>
          <AddBoxIcon
            className='filter-add-btn'
            style={{ fontSize: 30 }}
            onClick={() => setShowFilter(true)}
          />
        </div>}
      </div>

      { showFilter && 
        <DateFilter 
          deleteFilter={cancelFilter} 
          setDatesPeriod={setDatesPeriod}
        />}

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
