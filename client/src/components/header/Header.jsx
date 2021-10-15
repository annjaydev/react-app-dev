import React from 'react';
import HealingOutlined from '@material-ui/icons/HealingOutlined';
import './index.scss';

export const Header = ({ title, logout, token }) => {
  return (
    <div className='header'>
      <HealingOutlined className='header__logo' />
      <h1 className='header__title'>{title}</h1>
      {!!token &&
        <button
          className='header__btn'
          onClick={logout}
        >
          Выход
        </button>
      }
    </div>
  );
}
