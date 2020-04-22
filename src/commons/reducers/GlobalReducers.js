import { SET_MODAL_VISIBLE, UNSUSBCRIBE_FROM_ALL } from '../globalText';

export const initialGlobalState = {
  modalVisible: false,
  formType: null,
  unsubscriptions: [],
};

export const GlobalReducer = (state, action) => {
  switch (action.type) {
    case SET_MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.flag,
        formType: action.formType,
      };
    case UNSUSBCRIBE_FROM_ALL:
      return {
        ...state,
        unsubscriptions: [...state.unsubscriptions, action.unsubscription],
      };
    default:
      return state;
  }
};
