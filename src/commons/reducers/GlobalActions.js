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
    } else {
      ref = ref.where(k, '==', filters[k]);
    }
    return null;
  });
  return ref;
};

export const getListOfData = async (Reference, { limit = 5, ...params }) => {
  const ref = setFilters(Reference, params);
  const result = (await ref.limit(limit).get()).docChanges();
  return result.map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};
