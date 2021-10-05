import React from 'react';
import { TextField } from '@material-ui/core';
import './index.scss';

export const AddForm = ({onSubmit}) => {

  const doctors = [
    {id: '1q1', name: 'Грызлов Борис Вячеславович'},
    {id: '1q2', name: 'Азаров Дмитрий Игоревич'},
    {id: '1q3', name: 'Аксенов Сергей Валерьевич'},
    {id: '1q4', name: 'Володин Вячеслав Викторович'}
  ];

  return (
    <form className='add-form' onSubmit={(e) => onSubmit(e)}>
      <div className='add-form__fields'>
        <div className='add-form__control'>
          <label>Имя:</label>
          <input className='add-form__field' type="text" />
        </div>
        <div className='add-form__control'>
          <label>Врач:</label>
          <select
            className='add-form__field'
            style={{ width: '100%', backgroundColor: '#ffffff' }}
          >
            <option selected disabled hidden value=''></option>
            {doctors.map(doctor => {
              return <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
            })};
          </select>
        </div>
        <div className='add-form__control'>
          <label>Дата:</label>

            <TextField
              className='add-form__field'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                disableUnderline: true
              }}
            />

        </div>
        <div className='add-form__control'>
          <label>Жалобы:</label>
          <input className='add-form__field' type="text" />
        </div>
      </div>

      <button
        className='add-form__submit-btn'
        type='submit'
      >Добавить</button>
    </form>
  );
}
