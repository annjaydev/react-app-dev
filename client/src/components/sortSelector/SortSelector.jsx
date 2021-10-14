import React from 'react';
import './index.scss';

export const SortSelector = ({ labelText, collection, changeSortValue, isKey = false, currentSort }) => {

  return (
    <div className='sort-selector__container'>
      <label className='common-text'>{labelText}</label>
      <select
        className='sort-selector__field common-text base-input'
        onChange={(e) => changeSortValue(e.target.value, isKey)}
        value={currentSort ? (isKey ? currentSort.key : currentSort.dir) : ''}
      >
        <option disabled hidden value=''></option>
        {collection.map(collItem => {
          return <option
            key={collItem.id}
            value={collItem.key}
          >
            {collItem.value}
          </option>
        })};
      </select>
    </div>
  );
}
