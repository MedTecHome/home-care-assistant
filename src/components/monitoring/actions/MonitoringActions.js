import { getProfilesAction } from '../../Profiles/reducers/ProfileActions';
import {
  getBloodPressureAction,
  getTemperatureAction,
  getWeightAction,
  getGlucoseAction,
  getBreathingAction,
  getINRAction,
  getOxygenAction,
  getExercisesAction
} from '../../MedicalForms/reducers/PatienHealthActions';

const getMonitoringListAction = async ({ filters }) => {
  const profiles = await getProfilesAction({ filters: { 'role.id': 'patient', ...filters } });

  const resultList = profiles.map(async profile => {
    const promiseList = await Promise.all([
      getBloodPressureAction({ limit: 1, 'user.id': profile.id }),
      getTemperatureAction({ limit: 1, 'user.id': profile.id }),
      getWeightAction({ limit: 1, 'user.id': profile.id }),
      getGlucoseAction({ limit: 1, 'user.id': profile.id }),
      getBreathingAction({ limit: 1, 'user.id': profile.id }),
      getINRAction({ limit: 1, 'user.id': profile.id }),
      getOxygenAction({ limit: 1, 'user.id': profile.id }),
      getExercisesAction({ limit: 1, 'user.id': profile.id })
    ]);

    let result = { user: profile };
    const aux = promiseList
      .reduce((previousValue, currentValue) => {
        return [...previousValue, ...currentValue];
      }, [])
      .sort((a, b) => {
        const c = a.clinicalDate;
        const d = b.clinicalDate;
        return d - c;
      });
    aux.map(tst => {
      result = { ...result, [tst.type.id]: tst, latestDate: aux[0].clinicalDate };
      return null;
    });

    return result;
  });

  return Promise.all(resultList);
};

export default getMonitoringListAction;
