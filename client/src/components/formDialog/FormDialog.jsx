import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AddForm } from '../addForm/AddForm';
import './index.scss';

export const FormDialog = ({ open, setDialogOpen, currentData }) => {

  const showData = ({ fullName, doctor, date, complains }) => {
    console.log(fullName);
    console.log(doctor);
    console.log(date);
    console.log(complains);
  }

  return (
    <Dialog open={open} className='form-modal'>
      <DialogTitle>Изменить прием</DialogTitle>
      <DialogContent>
        <AddForm
          id='add-form'
          sendData={showData}
          currentData={currentData}
        />
      </DialogContent>
      <DialogActions>
        <button
          className='close-dialog-btn button-styled'
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </button>
        <button
          className='save-dialog-btn button-styled'
          form='add-form'
          type='submit'
        >
          Save
        </button>
      </DialogActions>
    </Dialog>

  );
}
