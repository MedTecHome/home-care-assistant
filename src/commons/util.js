export default function addOrReplace(array, item) {
  const result = array;
  const i = result.findIndex(_item => _item.id === item.id);
  if (i > -1) result[i] = item;
  else result.push(item);
  return result;
}
