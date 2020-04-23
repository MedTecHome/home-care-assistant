import { SET_MODAL_VISIBLE, UNSUSBCRIBE_FROM_ALL } from '../globalText';

export const setModalVisibleAction = (flag, formType) => ({
  type: SET_MODAL_VISIBLE,
  flag,
  formType,
});

export const setUnsubscriptionAction = unsubscription => ({
  type: UNSUSBCRIBE_FROM_ALL,
  unsubscription,
});
