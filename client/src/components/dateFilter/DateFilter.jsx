import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import './index.scss';

export const DateFilter = ({deleteFilter, setDatesPeriod}) => {

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const sendFilterData = () => {
    if (dateFrom && 
        dateTo &&
        dateFrom < dateTo) {
      setDatesPeriod({dateFrom, dateTo});
    }
  }

  return (
    <div className='date-filter__container'>
      <div className='date-filter__control'>
        <label className='common-text'>
          c :
        </label>
        <TextField
          className='date-filter__field base-input'
          type='date'
          name='date'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            disableUnderline: true
          }}
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>

      <div className='date-filter__control'>
        <label className='common-text'>
          по :
        </label>
        <TextField
          className='date-filter__field base-input'
          type='date'
          name='date'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            disableUnderline: true
          }}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>

      <button
        className='btn-styled date-filter__confirm-btn'
        onClick={sendFilterData}
      >
        Фильтровать
      </button>

      <DeleteOutlineIcon 
        className='date-filter__cancel-btn'
        onClick={() => deleteFilter(false)}
      />
    </div>
  );
}
