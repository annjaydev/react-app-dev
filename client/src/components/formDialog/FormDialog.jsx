import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AddForm } from '../addForm/AddForm';
import './index.scss';

export const FormDialog = ({ open, setDialogOpen, currentData, editAppointment }) => {

  return (
    <Dialog open={open} className='form-modal'>
      <DialogTitle>Изменить прием</DialogTitle>
      <DialogContent>
        <AddForm
          id='add-form'
          sendData={editAppointment}
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
