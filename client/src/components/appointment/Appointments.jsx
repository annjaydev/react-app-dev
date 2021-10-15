import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { formatDate } from '../../utils/date.formates';
import { tableHeaders } from '../../utils/collections';
import './index.scss';

export const Appointments = ({ appointments, setCurrentAppointment, setDialogOpen, setWarningOpen }) => {

  const handleBtn = (data, action) => {
    setCurrentAppointment({
      fullName: data.fullName,
      doctor: data.doctor,
      date: data.date,
      complains: data.complains,
      id: data._id
    });

    switch (action) {
      case 'delete':
        setWarningOpen(true);
        break;

      case 'edit':
        setDialogOpen(true);
        break;

      default:
        break;
    }
  }

  return (
    <div className='appointments'>
      <div className='appointments__header'>
        {tableHeaders.map(header => (<div className='appointments__header-item' key={header.id}>{header.header}</div>))}
      </div>

      <div className='appointments__body' >
        {appointments.map(appointment => (
          <div className='appointments__body-row' key={appointment._id}>
            <div className='appointments__row-item'>
              {appointment.fullName}
            </div>
            <div className='appointments__row-item'>
              {appointment.doctor}
            </div>
            <div className='appointments__row-item'>
              {formatDate(appointment.date)}
            </div>
            <div className='appointments__row-item'>
              {appointment.complains}
            </div>
            <div className='appointments__row-item'>
              <Tooltip title='Удалить прием'>
                <DeleteOutlineIcon
                  className='pointer'
                  onClick={() => handleBtn(appointment, 'delete')}
                />
              </Tooltip>
              <Tooltip title='Редактировать прием'>
                <EditIcon
                  className='pointer'
                  onClick={() => handleBtn(appointment, 'edit')}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
