import { retriveData, retriveDoc } from './utils';

const getNomenclator = async (nomenclator, id = undefined) => {
  if (id) {
    const result = await retriveDoc(`nomenclators/${nomenclator}/${id}`);
    return result;
  }
  const result = await retriveData(`nomenclators/${nomenclator}`, 10000, 0, {}, null, null);
  return result;
};
export default getNomenclator;
