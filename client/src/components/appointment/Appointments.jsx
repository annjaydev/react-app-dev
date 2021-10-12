import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import './index.scss';

export const Appointments = ({ appointments, setCurrentAppointment, setDialogOpen, setWarningOpen }) => {
  return (
    <div className='appointments'>
      <div className='appointments__header'>
        <div className='appointments__header-item'>Имя</div>
        <div className='appointments__header-item'>Врач</div>
        <div className='appointments__header-item'>Дата</div>
        <div className='appointments__header-item'>Жалобы</div>
      </div>

      <div className='appointments__body' >
        {appointments.map(appointment => {
          return (
            <div className='appointments__body-row' key={appointment._id}>
              <div className='appointments__row-item'>
                {appointment.fullName}
              </div>
              <div className='appointments__row-item'>
                {appointment.doctor}
              </div>
              <div className='appointments__row-item'>
                {appointment.date.slice(0, 10)}
              </div>
              <div className='appointments__row-item'>
                {appointment.complains}
              </div>
              <div className='appointments__row-item'>
                <DeleteOutlineIcon 
                  onClick={() => {
                    setCurrentAppointment({
                      fullName: appointment.fullName,
                      doctor: appointment.doctor,
                      date: appointment.date,
                      complains: appointment.complains,
                      id: appointment._id
                    });

                    setWarningOpen(true);
                  }
                  }
                />
                <EditIcon
                  onClick={() => {
                    setCurrentAppointment({
                      fullName: appointment.fullName,
                      doctor: appointment.doctor,
                      date: appointment.date,
                      complains: appointment.complains,
                      id: appointment._id
                    });

                    setDialogOpen(true);
                  }
                  }
                />
              </div>
            </div>

          )
        })}
      </div>
    </div>
  );
}
