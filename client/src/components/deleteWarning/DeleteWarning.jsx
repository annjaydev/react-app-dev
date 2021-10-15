import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import './index.scss';

export const DeleteWarning = ({ text, openWarning, cancelAction, confirmAction }) => {
  return (
    <Dialog open={openWarning} className='delete-warning'>
      <DialogTitle>Удалить прием</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
        className='btn-styled btn-border-2'
        onClick={cancelAction}
        >
          Cancel
        </button>
        <button
        className='btn-styled btn-border-2 btn-light-blue'
        onClick={confirmAction}
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
    
  );
}
