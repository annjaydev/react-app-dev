import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AddForm } from '../addForm/AddForm';
import './index.scss';

export const FormDialog = () => {

  const showData = ({ fullName, doctor, date, complains }) => {
    console.log(fullName);
    console.log(doctor);
    console.log(date);
    console.log(complains);
  }

  return (
    <Dialog open={false} className='form-modal'>
      <DialogTitle>Изменить прием</DialogTitle>
      <DialogContent>
        <AddForm  id='add-form' sendData={showData}/>
      </DialogContent>
      <DialogActions>
        <button>Close</button>
        <button form='add-form' type='submit'>Save</button>
      </DialogActions>
    </Dialog>

  );
}
