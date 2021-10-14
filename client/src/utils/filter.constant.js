export const filterByDates = (coll, fieldName, periodFrom, periodTo) => {
  return coll.filter(collItem =>
    collItem[fieldName].slice(0, 10) >= periodFrom &&
    collItem[fieldName].slice(0, 10) <= periodTo
  );
}