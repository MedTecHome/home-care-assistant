import { retriveData, retriveDoc } from './utils';
import getNomenclator from './nomenclators';

const getMedicines = async (limit, offset, filters) => {
  try {
    return await retriveData('medicines', limit, offset, filters, 'name', 'asc');
  } catch (e) {
    throw new Error(e);
  }
};

export const getMedicineById = async id => {
  let result = await retriveDoc(`medicines/${id}`);

  if (result.administrationType) {
    const administrationTypeObj = await getNomenclator('administrationroute', result.administrationType);
    result = { ...result, administrationTypeObj };
  }
  if (result.doseType) {
    const doseTypeObj = await getNomenclator('dosis', result.doseType);
    result = { ...result, doseTypeObj };
  }
  if (result.concentrationType) {
    const concentrationTypeObj = await getNomenclator('concentrations', result.concentrationType);
    result = { ...result, concentrationTypeObj };
  }
  return result;
};

export default getMedicines;
