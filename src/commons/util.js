// import _ from 'lodash';

export default function addOrReplace(array, item) {
  const result = array;
  const i = result.findIndex(_item => _item.id === item.id);
  if (i > -1) result[i] = item;
  else result.push(item);
  return result;
}

/* export const differenceTwoObjects = function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = _.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}; */
