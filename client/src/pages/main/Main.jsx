import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { AddForm } from '../../components/addForm/AddForm';
import { Appointments } from '../../components/appointment/Appointments';
import { SortSelector } from '../../components/sortSelector/SortSelector';
import { FormDialog } from '../../components/formDialog/FormDialog';
import { DeleteWarning } from '../../components/deleteWarning/DeleteWarning';
import { DateFilter } from '../../components/dateFilter/DateFilter';
import { sortByProp } from '../../utils/sort.constant';
import { filterByDates } from '../../utils/filter.constant';
import { noAppointment, sortCollection, SortValues, SortDirections } from '../../utils/collections';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tooltip } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import axios from 'axios';
import './index.scss';

export const Main = ({ id, token, logout }) => {

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

  const [openSnack, setOpenSnack] = useState(false);
  const [snackData, setSnackData] = useState({
    severety: '',
    text: ''
  });

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
    showSuccessSnack('Добавлен новый прием')

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
      showSuccessSnack('Прием изменен')
    });
  }

  const deleteAppointment = async () => {
    await axios.delete(
      `http://${process.env.REACT_APP_BASE_URL}/deleteAppointment?id=${currentAppointment.id}`
    );

    await getAllAppointments(id).then(res => setAppointments(res));
    setWarningOpen(false);
    setCurrentAppointment(noAppointment);
    showSuccessSnack('Прием удален');
  }

  const cleanWarning = () => {
    setWarningOpen(false);
    setCurrentAppointment(noAppointment);
  }

  const cleanDialog = () => {
    setDialogOpen(false);
    setCurrentAppointment(noAppointment);
  }

  const cancelFilter = () => {
    setAppointments(appointmentsCopy);
    setShowFilter(false);
  }

  const handleClose = () => {
    setOpenSnack(false);
    setSnackData({
      severety: '',
      text: ''
    });
  }

  const showSuccessSnack = (text) => {
    setSnackData({
      severety: 'success',
      text: text
    })
    setOpenSnack(true);
  }

  useEffect(() => {
    if (id) {
      getAllAppointments(id)
        .then(res => {
          setAppointments(res);
          setAppointmentsCopy(res);
        });
    }

  }, [id]);

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
    let appointmentsSorted = null;
    if (sortDirection && sortDirection === 'По возрастанию') {
      if (sortValue === 'Имя') appointmentsSorted = sortByProp(appointments, SortDirections.Asc, SortValues.Name);
      else if (sortValue === 'Врач') appointmentsSorted = sortByProp(appointments, SortDirections.Asc, SortValues.Doctor);
      else if (sortValue === 'Дата') appointmentsSorted = sortByProp(appointments, SortDirections.Asc, SortValues.Date);

    } else if (sortDirection && sortDirection === 'По убыванию') {
      if (sortValue === 'Имя') appointmentsSorted = sortByProp(appointments, SortDirections.Desc, SortValues.Name);
      else if (sortValue === 'Врач') appointmentsSorted = sortByProp(appointments, SortDirections.Desc, SortValues.Doctor);
      else if (sortValue === 'Дата') appointmentsSorted = sortByProp(appointments, SortDirections.Desc, SortValues.Date);
    }

    if (appointmentsSorted) setAppointments(appointmentsSorted);
  }, [sortDirection, sortValue]);

  useEffect(() => {
    const result = filterByDates(appointmentsCopy, 'date', datesPeriod.dateFrom, datesPeriod.dateTo);
    if (datesPeriod.dateFrom && datesPeriod.dateTo) {
      setAppointments(result);
    }
  }, [datesPeriod])

  return (
    <div>
      <Header title='Приемы' logout={logout} token={token} />
      <AddForm
        sendData={createAppointment}
        currentData={noAppointment}
        id='main-add-form'
      />

      <div className="class"></div>

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

        {!showFilter && <div className='filter-activator'>
          <p className='common-text'>Добавить фильтр по дате: </p>
          <Tooltip title='Добавить фильтр'>
            <AddBoxIcon
              className='filter-add-btn'
              style={{ fontSize: 30 }}
              onClick={() => setShowFilter(true)}
            />
          </Tooltip>
        </div>}
      </div>

      {showFilter &&
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

      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackData.severety}>
          {snackData.text}
        </Alert>
      </Snackbar>
    </div>
  )
}
