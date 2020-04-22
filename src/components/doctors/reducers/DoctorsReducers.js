import {
  LIST_DOCTORS,
  LIST_DOCTORS_LOADING,
  SAVE_DOCTORS_LOADING,
  SELECTED_DOCTOR,
  SET_LIST_HOSPITALS_DOCTORS,
  TOTAL_LIST_DOCTORS,
} from '../../../commons/globalText';
import addOrReplace from '../../../commons/util';

export const initialDoctorsState = {
  doctors: [],
  total: 0,
  listLoading: false,
  saveLoading: false,
  doctorSelected: null,
  hospitalDoctorsList: [],
};

export const DoctorsReducer = (state, action) => {
  switch (action.type) {
    case LIST_DOCTORS:
      return {
        ...state,
        doctors: action.list,
      };
    case TOTAL_LIST_DOCTORS:
      return {
        ...state,
        total: action.total,
      };
    case SET_LIST_HOSPITALS_DOCTORS:
      return {
        ...state,
        hospitalDoctorsList: addOrReplace(state.hospitalDoctorsList, action.hospital),
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
