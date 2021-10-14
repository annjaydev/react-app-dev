import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getDate } from '../../utils/date.formates';
import './index.scss';

export const DateFilter = ({ deleteFilter, setDatesPeriod, showWarning }) => {

  const [dateFrom, setDateFrom] = useState(getDate(new Date()));
  const [dateTo, setDateTo] = useState(dateFrom);

  const sendFilterData = () => {
    if (dateFrom &&
      dateTo &&
      dateFrom <= dateTo) {
      setDatesPeriod({ dateFrom, dateTo });
    } else if (!dateFrom || !dateTo) {
      showWarning('Заполните все поля фильтрации приемов по дате');
    } else if (dateFrom > dateTo) {
      showWarning('Убедитесь в правильности введенных дат');
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
          value={dateFrom}
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
          name='date-to'
          value={dateTo}
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
