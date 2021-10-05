import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import './index.scss';

export const Appointments = ({ appointments }) => {
  return (
    <div className='appointments'>
      <div className='appointments__header'>
        <div className='appointments__header-item'>Имя</div>
        <div className='appointments__header-item'>Врач</div>
        <div className='appointments__header-item'>Дата</div>
        <div className='appointments__header-item'>Жалобы</div>
      </div>

      {appointments.map(appointment => {
        return (
          <div className='appointments__body' key={appointment._id}>

            <div className='appointments__body-row'>
              <div className='appointments__row-item'>
                {appointment.fullName}
              </div>
              <div className='appointments__row-item'>
                {appointment.doctor}
              </div>
              <div className='appointments__row-item'>
                {appointment.date}
              </div>
              <div className='appointments__row-item'>
                {appointment.complains}
              </div>
              <div className='appointments__row-item'>
                <DeleteOutlineIcon />
                <EditIcon />
              </div>
            </div>

          </div>
        )
      })}
    </div>
  );
}
