import { LIST_HOSPITAL, SELECTED_HOSPITALS, SET_HOSPITAL_MODAL_VISIBLE } from '../../../commons/globalText';

export const initialHispitalState = {
  hospitals: [],
  total: 0,
  hospitalsSelected: null,
  hospitalModalVisible: false,
  hospitalFormType: null,
};

export const HospitalReducers = (state, action) => {
  switch (action.type) {
    case LIST_HOSPITAL:
      return {
        ...state,
        hospitals: action.list,
        total: action.total,
      };
    case SELECTED_HOSPITALS:
      return {
        ...state,
        hospitalsSelected: state.hospitals.filter(a => action.ids.some(b => b === a.id)),
      };
    case SET_HOSPITAL_MODAL_VISIBLE:
      return {
        ...state,
        hospitalModalVisible: action.flag,
        hospitalFormType: action.formType,
      };
    default:
      return state;
  }
};
