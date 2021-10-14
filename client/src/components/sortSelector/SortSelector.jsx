import React from 'react';
import './index.scss';

export const SortSelector = ({ labelText, collection, changeFilterValue }) => {
  return (
    <div className='sort-selector__container'>
      <label className='common-text'>{labelText}</label>
      <select
        className='sort-selector__field common-text base-input'
        onChange={(e) => changeFilterValue(e.target.value)}
        defaultValue=''
      >
        <option disabled hidden value=''></option>
        {collection.map(collItem => {
          return <option
            key={collItem.id}
            value={collItem.value}
          >
            {collItem.value}
          </option>
        })};
      </select>
    </div>
  );
}
