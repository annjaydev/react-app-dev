import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { getDate } from '../../utils/date.formates';
import { doctors } from '../../utils/collections';
import './index.scss';

export const AddForm = ({ sendData, id, currentData, showWarning }) => {

  const [buttonDisable, setButtonDisable] = useState(true);

  const [formData, setFormData] = useState({
    fullName: currentData.fullName,
    doctor: currentData.doctor,
    date: currentData.date,
    complains: currentData.complains
  });

  useEffect(() => {
    let allFieldsFilled = true;

    for (let key in formData) {
      if (!formData[key]) {
        allFieldsFilled = false;
      }
    }

    setButtonDisable(!allFieldsFilled);
  }, [formData]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    
    if (!buttonDisable) {
      sendData(formData);

      setFormData({
        fullName: '',
        doctor: '',
        date: '',
        complains: ''
      });
    } else if (buttonDisable) {
      showWarning('Заполните все поля');
    }
  }

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 14);

  return (
    <form id={id} className='add-form' onSubmit={(e) => onSubmitForm(e)}>
      <div className='add-form__fields'>
        <div className='add-form__control'>
          <label className='add-form__label'>Имя:</label>
          <input
            className='add-form__field'
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={(e) => changeHandler(e)}
          />
        </div>

        <div className='add-form__control'>
          <label className='add-form__label'>Врач:</label>
          <select
            className='add-form__field'
            style={{ width: '100%', backgroundColor: '#ffffff' }}
            name='doctor'
            value={formData.doctor}
            onChange={(e) => changeHandler(e)}
          >
            <option selected disabled hidden value=''></option>
            {doctors.map(doctor => {
              return <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
            })};
          </select>
        </div>

        <div className='add-form__control'>
          <label className='add-form__label'>Дата:</label>
          <TextField
            className='add-form__field'
            type='date'
            name='date'
            value={formData.date.slice(0, 10)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              disableUnderline: true
            }}
            inputProps={{
              min: getDate(minDate),
              max: getDate(maxDate)
            }}
            onChange={(e) => changeHandler(e)}
          />

        </div>
        <div className='add-form__control'>
          <label className='add-form__label'>Жалобы:</label>
          <textarea
            className='add-form__field add-form__complains'
            name='complains'
            rows='6'
            value={formData.complains}
            maxLength='198'
            onChange={(e) => changeHandler(e)}
          >
          </textarea>
        </div>
      </div>

      <button
        className='add-form__submit-btn'
        type='submit'
        disabled={buttonDisable}
      >Добавить</button>
    </form>
  );
}
