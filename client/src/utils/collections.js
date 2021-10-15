export const noAppointment = {
  fullName: '',
  doctor: '',
  date: '',
  complains: '',
  id: ''
};

export const sortCollection = [
  { id: '1ci1', key: 'fullName', value: 'Имя' },
  { id: '1ci2', key: 'doctor', value: 'Врач' },
  { id: '1ci3', key: 'date', value: 'Дата' },
  { id: '1ci4', key: 'none', value: 'Отменить' }
];

export const doctors = [
  { id: '1q1', name: 'Грызлов Борис Вячеславович' },
  { id: '1q2', name: 'Азаров Дмитрий Игоревич' },
  { id: '1q3', name: 'Аксенов Сергей Валерьевич' },
  { id: '1q4', name: 'Володин Вячеслав Викторович' }
];

export const tableHeaders = [
  {id: '1t1', header: 'Имя'},
  {id: '1t2', header: 'Врач'},
  {id: '1t3', header: 'Дата'},
  {id: '1t4', header: 'Жалобы'},
];

export const warningMessages = {
  emptyField: 'Заполните все поля',
  wrongDates: 'Убедитесь в правильности введенных дат',
  loginLength: 'Длина логина - 6-20 символов',
  passwordCheck: 'Пароль может состоять только из латинских букв и обязательно должен включать в себя 1 букву и 1 цифру. Длина пароля - 6-20 символов',
  passwordRepeat: 'Пароли не совпадают'
};

export const successMessages = {
  newAppointment: 'Добавлен новый прием',
  editedAppointment: 'Прием изменен',
  deletedAppointment: 'Прием удален'
}
