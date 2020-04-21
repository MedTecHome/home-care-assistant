import { LIST_DOCTORS, LIST_DOCTORS_LOADING, SAVE_DOCTORS_LOADING, SELECTED_DOCTOR } from '../../../commons/globalText';

export const initialDoctorsState = {
  doctors: [],
  listLoading: false,
  saveLoading: false,
  doctorSelected: null,
};

export const DoctorsReducer = (state, action) => {
  switch (action.type) {
    case LIST_DOCTORS:
      return {
        ...state,
        doctors: action.list,
      };
    case LIST_DOCTORS_LOADING:
      return {
        ...state,
        listLoading: action.flag,
      };
    case SAVE_DOCTORS_LOADING:
      return {
        ...state,
        saveLoading: action.flag,
      };
    case SELECTED_DOCTOR:
      return {
        ...state,
        doctorSelected: state.doctors.find(a => a.id === action.selected) || null,
      };
    default:
      return state;
  }
};
