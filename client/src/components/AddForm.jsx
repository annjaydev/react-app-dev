import React from 'react';
import { TextField , createTheme, ThemeProvider } from '@material-ui/core';
import { ruRU } from '@material-ui/core/locale';
import './AddForm.scss';

const theme = createTheme({}, ruRU);

export const AddForm = () => {

  //state is here

  return (
    <form className='add-form'>
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
            <option value='Грызлов Борис Вячеславович'>Грызлов Борис Вячеславович</option>
            <option value='Азаров Дмитрий Игоревич'>Азаров Дмитрий Игоревич</option>
            <option value='Аксенов Сергей Валерьевич'>Аксенов Сергей Валерьевич</option>
            <option value='Володин Вячеслав Викторович'>Володин Вячеслав Викторович</option>
          </select>
        </div>
        <div className='add-form__control'>
          <label>Дата:</label>
          <ThemeProvider theme={theme}>
            <TextField
              className='add-form__field'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </ThemeProvider>
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
