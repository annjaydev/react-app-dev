import React from 'react';
import { Header } from '../components/Header';

export const Main = ({id, token, logout}) => {
  return (
    <div>
      <Header title='Приемы' logout={logout} token={token}/>
      <h1>Дратвуйти</h1>
    </div>
  )
}
