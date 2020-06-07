import moment from 'moment';
import { SET_MODAL_VISIBLE } from '../globalText';

export default function setModalVisibleAction(flag, formType) {
  return {
    type: SET_MODAL_VISIBLE,
    flag,
    formType
  };
}

export const setFilters = (Reference, filters) => {
  let ref = Reference;
  Object.keys(filters).map(k => {
    if (k === 'name') {
      ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
    } else if (k === 'fullname') {
      ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
    } else if (k === 'clinicalDate') {
      const customDate = moment(filters[k]).unix();
      const tomorrow = moment(filters[k]).add(1, 'days').unix();
      ref = ref.where(k, '>=', customDate).where(k, '<', tomorrow);
    } else if (k === 'startDate' || k === 'endDate') {
      const start = moment(filters[k][0]).isValid() ? moment(filters[k][0]).unix() : 0;
      const end = moment(filters[k][1]).isValid() ? moment(filters[k][1]).unix() : 0;
      ref = ref.where('clinicalDate', '>=', start).where('clinicalDate', '<=', end);
    } else {
      ref = ref.where(k, '==', filters[k]);
    }
    return null;
  });
  return ref;
};

export const getListOfData = async (Reference, { limit, ...params }) => {
  let ref = setFilters(Reference, params);
  ref = limit ? ref.limit(limit) : ref;
  const result = (await ref.get()).docChanges();
  return result.map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};
