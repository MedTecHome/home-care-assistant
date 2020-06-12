import { retriveData } from './utils';

const getClinicalTests = async (limit, page, params, type) => {
  const path = !type || type === 'recently' ? 'clinicaltest' : type;
  return retriveData(path, limit, page, params);
};

export default getClinicalTests;
