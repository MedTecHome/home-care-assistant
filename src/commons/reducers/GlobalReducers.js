import { SET_MODAL_VISIBLE } from '../globalText';

export const initialGlobalState = {
  modalVisible: false,
  formType: null,
};

export const GlobalReducer = (state, action) => {
  switch (action.type) {
    case SET_MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.flag,
        formType: action.formType,
      };
    default:
      return state;
  }
};
