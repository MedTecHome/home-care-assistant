import { retriveData } from './utils';

const getEvolution = async filters => {
  const path = 'evolution';
  const result = await retriveData(path, 0, 0, filters);
  return result;
};

export default getEvolution;
