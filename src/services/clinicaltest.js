import { retriveData, createDoc } from './utils';
import specifyClinicalTest from '../schema/clinicalTest';

const getClinicalTests = async (limit, page, params, type) => {
  const path = !type || type === 'recently' ? 'clinicaltest' : type;
  return retriveData(path, limit, page, params);
};

export const saveHealthDataAction = (values, forms) => {
  const multiAdd = forms.map(type => {
    const path = `${type}`;
    return createDoc(path, specifyClinicalTest(type, values));
  });

  return Promise.all(multiAdd);
};

export default getClinicalTests;
