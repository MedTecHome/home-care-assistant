import getClinicalTests from './clinicaltest';
import getTreatments from './treatments';
import getNomenclator from './nomenclators';
import { getMedicineById } from './medicines';

const getEvolutionTreatments = async ({ rangeDate, user = 'none', ...rest }) => {
  try {
    if (rangeDate && rangeDate.length === 2) {
      const rDate = rangeDate.map(date => date.unix());
      const filters = { user, ...rest };
      const response1 = await getTreatments(365, 0, {
        ...filters,
        startDate: rDate
      });
      const response2 = await getTreatments(365, 0, {
        ...filters,
        endDate: rDate
      });

      const response = response1.data.concat(response2.data).filter(
        (thing, index, self) =>
          index ===
          self.findIndex(t => {
            return t.id === thing.id;
          })
      );

      const treatments = response.map(async t => {
        const medicine = await getMedicineById(t.medicines);
        let result = { ...medicine, ...JSON.parse(t.medicineSetting) };
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
        return { ...t, medicineObject: result, startDate: t.startDate, endDate: t.endDate };
      });

      return Promise.all(treatments);
    }
    return [];
  } catch (e) {
    throw new Error(e);
  }
};

const getEvolutionClinical = async ({ rangeDate, user, ...filters }) => {
  try {
    if (rangeDate && rangeDate.length === 2) {
      const rDate = rangeDate.map(date => date.unix());
      const response = await getClinicalTests(
        1,
        {},
        {
          user: user || 'none',
          ...filters,
          rangeDate: rDate
        }
      );

      const result = response.data
        .map(a => {
          return {
            ...a.type,
            list: response.data.filter(b => b.type.id === a.type.id)
          };
        })
        .filter(
          (thing, index, self) =>
            index ===
            self.findIndex(t => {
              return t.id === thing.id;
            })
        );

      return { ...response, data: result };
    }
    return { total: 0, data: [] };
  } catch (e) {
    throw new Error(e);
  }
};

const getEvolution = async filters => {
  const aux = await Promise.all([getEvolutionTreatments(filters), getEvolutionClinical(filters)]);
  return { treatments: aux[0], clinicaltest: aux[1].data };
};

export default getEvolution;
