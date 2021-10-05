import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import './index.scss';

export const AddForm = ({ sendData }) => {

  const [buttonDisable, setButtonDisable] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    doctor: '',
    date: '',
    complains: ''
  });

  useEffect(() => {
    let allFieldsFilled = true;

    for (let key in formData) {
      if (!formData[key]) {
        allFieldsFilled = false;
      }
    }

    if (allFieldsFilled) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true)
    }
  }, [formData]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const doctors = [
    { id: '1q1', name: 'Грызлов Борис Вячеславович' },
    { id: '1q2', name: 'Азаров Дмитрий Игоревич' },
    { id: '1q3', name: 'Аксенов Сергей Валерьевич' },
    { id: '1q4', name: 'Володин Вячеслав Викторович' }
  ];

  const onSubmitForm = (e) => {
    e.preventDefault();
    sendData(formData);

    setFormData({
      fullName: '',
      doctor: '',
      date: '',
      complains: ''
    });
  }

  return (
    <form className='add-form' onSubmit={(e) => onSubmitForm(e)}>
      <div className='add-form__fields'>
        <div className='add-form__control'>
          <label>Имя:</label>
          <input
            className='add-form__field'
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={(e) => changeHandler(e)}
          />
        </div>

        <div className='add-form__control'>
          <label>Врач:</label>
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
          <label>Дата:</label>
          <TextField
            className='add-form__field'
            type='date'
            name='date'
            value={formData.date}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              disableUnderline: true
            }}
            onChange={(e) => changeHandler(e)}
          />

        </div>
        <div className='add-form__control'>
          <label>Жалобы:</label>
          <input
            className='add-form__field'
            type='text'
            name='complains'
            value={formData.complains}
            onChange={(e) => changeHandler(e)}
          />
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
