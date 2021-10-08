import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { AddForm } from '../addForm/AddForm';
import './index.scss';

export const FormDialog = ({ open, currentData, cancelAction, confirmAction }) => {

  return (
    <Dialog open={open} className='form-modal'>
      <DialogTitle>Изменить прием</DialogTitle>
      <DialogContent>
        <AddForm
          id='add-form'
          sendData={confirmAction}
          currentData={currentData}
        />
      </DialogContent>
      <DialogActions>
        <button
          className='btn-border-2 btn-styled'
          onClick={cancelAction}
        >
          Cancel
        </button>
        <button
          className='btn-border-2 btn-styled btn-light-blue'
          form='add-form'
          type='submit'
        >
          Save
        </button>
      </DialogActions>
    </Dialog>

  );
}
