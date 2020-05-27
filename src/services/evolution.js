import { getClinicalTests } from './clinicaltest';
import getTreatments from './treatments';

const getEvolutionTreatments = async ({ rangeDate, ...rest }) => {
  try {
    if (rangeDate && rangeDate.length === 2) {
      const rDate = rangeDate.map(date => date.unix());
      const filters = { 'user.id': 'none', ...rest };
      const response1 = await getTreatments(
        365,
        {},
        {
          ...filters,
          startDate: rDate
        }
      );
      const response2 = await getTreatments(
        365,
        {},
        {
          ...filters,
          endDate: rDate
        }
      );

      const response = response1.data.concat(response2.data).filter(
        (thing, index, self) =>
          index ===
          self.findIndex(t => {
            return t.id === thing.id;
          })
      );

      let medicines = [];
      response.map(t => {
        const aux = t.medicines.map(m => ({
          ...m,
          startDate: t.startDate,
          endDate: t.endDate
        }));
        medicines = [...medicines, ...aux];
        return null;
      });

      const result = medicines.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(t => {
            return t.id === thing.id;
          })
      );

      return result;
    }
    return [];
  } catch (e) {
    throw new Error(e);
  }
};

const getEvolutionClinical = async ({ rangeDate, ...filters }) => {
  try {
    if (rangeDate && rangeDate.length === 2) {
      const rDate = rangeDate.map(date => date.unix());
      const response = await getClinicalTests(
        1,
        {},
        {
          'user.id': 'none',
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
