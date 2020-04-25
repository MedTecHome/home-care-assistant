import { SET_MODAL_VISIBLE } from '../globalText';

export default function setModalVisibleAction(flag, formType) {
  return {
    type: SET_MODAL_VISIBLE,
    flag,
    formType,
  };
}
