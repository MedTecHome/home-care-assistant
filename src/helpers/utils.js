/* eslint-disable eqeqeq */
import moment from 'moment';

export const isLocal = process.env.REACT_APP_DEVELOPMENT === 'local';
export const reactDB = process.env.REACT_APP_DB;
export const BRANCH_DEPLOY = process.env.REACT_APP_BRANCH_DEPLOY;

export const isEmpty = value => {
  const type = Object.prototype.toString.call(value);

  switch (type) {
    case '[object Array]':
    case '[object String]':
      return !value.length;

    case '[object Map]':
    case '[object Set]':
      return !value.size;

    case '[object Object]':
      return !Object.keys(value).length;

    default:
      return true;
  }
};

export const getPropValue = (obj, key) => key.split('.').reduce((o, x) => (o == undefined ? o : o[x]), obj);

export const formatDateWithTime = (date, time) => {
  const m1 = moment(time).format('hh:mm:ss a');
  const m2 = moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD');
  return moment(`${m2} ${m1}`, 'YYYY/MM/DD hh:mm:ss a').unix();
};

export const enumerateDaysBetweenDates = (startDate, endDate) => {
  const dates = [];
  if (startDate && endDate) {
    const currDate = moment(startDate).startOf('day');
    const lastDate = moment(endDate).startOf('day');
    dates.push(startDate);
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(currDate.clone().toDate());
    }
    dates.push(endDate);
  }
  return dates;
};

export const queryFromParams = params => {
  return (
    Object.keys(params)
      .filter(k => params[k])
      .map(k => {
        const type = Object.prototype.toString.call(params[k]);
        if (type === '[object Array]') {
          return params[k].map((f, index) => `${k}[${index}]=${f}`).join('&');
        }
        return `${k}=${params[k]}`;
      })
      .join('&') || ''
  );
};

export const compareStringTagName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const compareTrueField = (x, y) => {
  return (x === y && 1) || x ? 1 : -1;
};

export const mutateDoc = doc => ({ id: doc.id, ...doc.data() });
