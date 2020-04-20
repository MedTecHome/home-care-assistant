import { SET_MODAL_VISIBLE } from '../globalText';

export default (flag, formType) => ({
  type: SET_MODAL_VISIBLE,
  flag,
  formType,
});
