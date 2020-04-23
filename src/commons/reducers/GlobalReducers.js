import { SET_MODAL_VISIBLE, SET_ROLES, UNSUSBCRIBE_FROM_ALL } from '../globalText';

export const initialGlobalState = {
  modalVisible: false,
  formType: null,
  roles: [],
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
    case SET_ROLES:
      return {
        ...state,
        roles: action.roles,
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
