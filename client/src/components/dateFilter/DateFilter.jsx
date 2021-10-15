import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { warningMessages } from '../../utils/collections';
import './index.scss';

export const DateFilter = ({ deleteFilter, setDatesPeriod, showWarning }) => {

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const sendFilterData = () => {
    if (dateFrom > dateTo) {
      showWarning(warningMessages.wrongDates);
    } else {
      setDatesPeriod({ isFilter: true, startDate: dateFrom, endDate: dateTo });
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
          name='date-from'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            disableUnderline: true
          }}
          inputProps={{
            max: dateTo
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
          name='date-to'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            disableUnderline: true
          }}
          inputProps={{
            min: dateFrom
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
