/* eslint-disable eqeqeq */
import moment from 'moment';

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

export default function addOrReplace(array, item) {
  const result = array;
  const i = result.findIndex(_item => _item.id === item.id);
  if (i > -1) result[i] = item;
  else result.push(item);
  return result;
}

export const getPropValue = (obj, key) => key.split('.').reduce((o, x) => (o == undefined ? o : o[x]), obj);

export const formatMomentToDate = date => {
  return moment(date, 'DD/MM/YYYY').toDate();
};

export const formatDateWithTime = (date, time) => {
  const m1 = moment(time).format('hh:mm:ss a');
  const m2 = moment(date, 'DD/MM/YYYY').format('YYYY/MM/DD');
  return moment(`${m2} ${m1}`, 'YYYY/MM/DD hh:mm:ss a').toDate();
};

export const extractValues = (dirtyFields, allValues) => {
  return Object.keys(dirtyFields)
    .map(k => ({ [k]: allValues[k] }))
    .reduce((a, b) => ({ ...a, ...b }), {});
};
