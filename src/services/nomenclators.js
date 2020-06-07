import { retriveData, retriveDoc } from './utils';

const getNomenclator = async (nomenclator, id = undefined) => {
  if (id) {
    const result = await retriveDoc(`${nomenclator}/${id}`);
    return result;
  }
  const result = await retriveData(`${nomenclator}`, 10000, 0, {}, null, null);
  return result;
};
export default getNomenclator;
