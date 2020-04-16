const valueTypes = ({
  nullValue,
  booleanValue,
  integerValue,
  doubleValue,
  timestampValue,
  stringValue,
  bytesValue,
  referenceValue,
  geoPointValue,
  arrayValue,
  mapValue,
}) =>
  booleanValue ||
  Number(integerValue) ||
  doubleValue ||
  timestampValue ||
  stringValue ||
  bytesValue ||
  referenceValue ||
  geoPointValue ||
  arrayValue ||
  nullValue ||
  mapValue;

export default (list) =>
  list.map(({ name, fields }) => {
    const result = Object.keys(fields)
      .map((a) => ({ [a]: valueTypes(fields[a]) }))
      .reduce((b, c) => ({ ...b, ...c }), {});
    return { id: name, ...result };
  });
