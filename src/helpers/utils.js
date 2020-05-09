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

// delete this when you add any other function
export const asd = 'asd';
