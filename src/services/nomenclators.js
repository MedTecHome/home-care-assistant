import { retriveData, retriveDoc } from './utils';

const getNomenclator = async (nomenclator, id = undefined) => {
  if (id) {
    return await retriveDoc(`nomenclators/${nomenclator}/${id}`);
  }
  return await retriveData(`nomenclators/${nomenclator}`, 10000, 0, {}, null, null);
};
export default getNomenclator;
