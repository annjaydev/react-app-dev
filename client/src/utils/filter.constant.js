export const filterByDates = (coll, fieldName, periodFrom = null, periodTo = null) => {

  if (periodFrom && periodTo) {
    return coll.filter(collItem =>
      collItem[fieldName].slice(0, 10) >= periodFrom &&
      collItem[fieldName].slice(0, 10) <= periodTo
    );
  } else if (periodFrom && !periodTo) {
    return coll.filter(collItem => collItem[fieldName].slice(0, 10) >= periodFrom );
  } else if (!periodFrom && periodTo) {
    return coll.filter(collItem => collItem[fieldName].slice(0, 10) <= periodTo );
  } else if (!periodFrom && !periodTo) {
    return coll;
  }
}