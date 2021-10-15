import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { AddForm } from '../../components/addForm/AddForm';
import { Appointments } from '../../components/appointment/Appointments';
import { SortSelector } from '../../components/sortSelector/SortSelector';
import { FormDialog } from '../../components/formDialog/FormDialog';
import { DeleteWarning } from '../../components/deleteWarning/DeleteWarning';
import { DateFilter } from '../../components/dateFilter/DateFilter';
import { filterByDates } from '../../utils/filter.constant';
import { noAppointment, sortCollection } from '../../utils/collections';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tooltip } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { sortBy } from 'lodash';
import axios from 'axios';
import './index.scss';

const sortDirectionColl = [
  { id: '2ci1', key: 'asc', value: 'По возрастанию' },
  { id: '2ci2', key: 'desc', value: 'По убыванию' }
];

export const Main = ({ id, token, logout }) => {

  const [appointments, setAppointments] = useState([]);
  const [appointmentsCopy, setAppointmentsCopy] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(noAppointment);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState({ isFilter: false, startDate: null, endDate: null });
  const [showFilter, setShowFilter] = useState(false);

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
    await axios.post(`http://${process.env.REACT_APP_BASE_URL}/addAppointment`, {
      fullName,
      doctor,
      date,
      complains,
      id
    }).then(result => {
      setAppointmentsCopy(result.data)
      setAppointments(result.data);
      showSuccessSnack('Добавлен новый прием');
    });
  }

  const editAppointment = async (parameter) => {
    await axios.put(`http://${process.env.REACT_APP_BASE_URL}/editAppointment`, {
      fullName: parameter.fullName,
      doctor: parameter.doctor,
      date: parameter.date,
      complains: parameter.complains,
      id: currentAppointment.id
    }).then(async res => {
      await getAllAppointments(id)
        .then(res => {
          setAppointmentsCopy(res);
          setAppointments(res);
        });
      setDialogOpen(false);
      setCurrentAppointment(noAppointment);
      showSuccessSnack('Прием изменен')
    });
  }

  const deleteAppointment = async () => {
    await axios.delete(
      `http://${process.env.REACT_APP_BASE_URL}/deleteAppointment?id=${currentAppointment.id}`
    );

    await getAllAppointments(id)
      .then(res => {
        setAppointmentsCopy(res);
        setAppointments(res);
      });
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
    setFilter({ isFilter: false, startDate: null, endDate: null });
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

  const showWarningSnack = (text) => {
    setSnackData({
      severety: 'warning',
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
    if (sort && sort.key && sort.dir) {
      sortFunction({ key: sort.key, dir: sort.dir });
    }
  }, [appointmentsCopy]);

  const sortFunction = (currentSort) => {
    let sortedArray = [...appointmentsCopy]
    if (currentSort && currentSort.key) {
      if (currentSort.dir === 'asc') {
        sortedArray = sortBy(sortedArray, item => item[currentSort.key]);
      }
      if (currentSort.dir === 'desc') {
        sortedArray = sortBy(sortedArray, item => item[currentSort.key]).reverse();
      }
    }
    setAppointments(sortedArray);
  }

  const changeSortValue = (value, isKey) => {
    if (value === 'none') {
      setSort(null);
      sortFunction(null);
    } else {

      let newSort = null;
      if (sort && sort.dir) {
        newSort = { key: (isKey ? value : sort.key), dir: (isKey ? sort.dir : value) };
      } else {
        newSort = { key: (isKey ? value : sort.key), dir: (isKey ? 'asc' : value) };
      }

      sortFunction(newSort);
      setSort(newSort);
    }
  }

  const getFilteredValues = (currentAppointments) => {
    let filteredArray = [...currentAppointments];
    filteredArray = filterByDates(filteredArray, 'date', filter.startDate, filter.endDate)
    return filteredArray;
  }

  return (
    <div>
      <Header title='Приемы' logout={logout} token={token} />
      <AddForm
        sendData={createAppointment}
        currentData={noAppointment}
        id='main-add-form'
        showWarning={showWarningSnack}
      />

      <div className='sort-block'>
        <SortSelector
          labelText='Сортировать по:'
          collection={sortCollection}
          changeSortValue={changeSortValue}
          isKey={true}
          currentSort={sort}
        />

        {
          sort && sort.key && (
            <SortSelector
              labelText='Направление:'
              collection={sortDirectionColl}
              changeSortValue={changeSortValue}
              currentSort={sort}
            />
          )
        }

        {!showFilter && <div className='filter-activator'>
          <p className='common-text'>Добавить фильтр по дате: </p>
          <Tooltip title='Добавить фильтр' >
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
          setDatesPeriod={setFilter}
          showWarning={showWarningSnack}
        />}

      {
        appointments.length > 0 ?
          <Appointments
            appointments={filter.isFilter ? getFilteredValues(appointments) : appointments}
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
        showWarning={showWarningSnack}
      />

      <DeleteWarning
        openWarning={warningOpen}
        text={'Вы действительно хотите удалить прием?'}
        cancelAction={cleanWarning}
        confirmAction={deleteAppointment}
      />

      <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackData.severety || 'info'}
          variant='filled'
          style={{ fontSize: '20px' }}
        >
          {snackData.text}
        </Alert>
      </Snackbar>
    </div>
  )
}
