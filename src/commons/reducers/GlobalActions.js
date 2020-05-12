import { SET_MODAL_VISIBLE } from '../globalText';

export default function setModalVisibleAction(flag, formType) {
  return {
    type: SET_MODAL_VISIBLE,
    flag,
    formType
  };
}

export const setFilters = (Reference, filters) => {
  // console.log(filters);
  let ref = Reference;
  Object.keys(filters).map(k => {
    if (k === 'name') {
      ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
    } else if (k === 'fullname') {
      ref = ref.where(k, '>=', filters[k]).where(k, '<=', `${filters[k]}\uf8ff`);
    } else if (k === 'date') {
      ref = ref.where(k, '>', filters[k]);
    } else {
      ref = ref.where(k, '==', filters[k]);
    }
    return null;
  });
  return ref;
};

export const getListOfData = async (Reference, { limit = 5, ...params }) => {
  const ref = setFilters(Reference, params);
  return (await ref.limit(limit).get()).docChanges().map(({ doc }) => ({ id: doc.id, ...doc.data() }));
};
