import getProfiles from './profiles';
import { getClinicalTests } from './clinicaltest';

const getMonitoring = async (limit, offset, filters) => {
  try {
    const profiles = await getProfiles(limit, offset, filters);
    const resultList = profiles.data.map(async item => {
      const clinicalTest = await getClinicalTests(1, 0, { 'user.id': item.id });

      let result = { user: item };
      const aux = clinicalTest.data.sort((a, b) => {
        const c = a.clinicalDate;
        const d = b.clinicalDate;
        return d - c;
      });

      aux.map(tst => {
        result = {
          ...result,
          [tst.type.id]: tst,
          latestDate: aux[0].clinicalDate
        };
        return null;
      });
      return result;
    });
    const data = await Promise.all(resultList);
    return { ...profiles, data };
  } catch (e) {
    throw new Error(e);
  }
};

export default getMonitoring;
