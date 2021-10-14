import { sortBy } from 'lodash';
import { SortDirections as dir } from './collections';

export const sortByProp = (array, direction, prop) => {
  let result = null;

  if (direction === dir.Asc) {
    result = sortBy(array, (item) => item[prop]);
  } else if (direction === dir.Desc) {
    result = sortBy(array, (item) => item[prop]).reverse();
  }

  return result;
}