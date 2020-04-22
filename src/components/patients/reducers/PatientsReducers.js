import {
  LIST_PATIENTS,
  LIST_PATIENTS_LOADING,
  SAVE_PATIENTS_LOADING,
  SELECTED_PATIENT,
  SET_LIST_DOCTORS_ON_PATIENTS,
  SET_LIST_HOSPITALS_DOCTORS,
  SET_TYPE_FORM,
  TOTAL_LIST_PATIENTS,
} from '../../../commons/globalText';
import addOrReplace from '../../../commons/util';

export const initialPatientsState = {
  patients: [],
  listLoading: false,
  saveLoading: false,
  total: 0,
  patientSelected: null,
  formType: null,
  patientDoctorList: [],
};

export const PatientsReducers = (state, action) => {
  switch (action.type) {
    case SET_TYPE_FORM:
      return {
        ...state,
        formType: action.formType,
      };
    case LIST_PATIENTS_LOADING:
      return {
        ...state,
        listLoading: action.flag,
      };
    case SET_LIST_DOCTORS_ON_PATIENTS:
      return {
        ...state,
        patientDoctorList: addOrReplace(state.patientDoctorList, action.doctor),
      };
    case SAVE_PATIENTS_LOADING:
      return {
        ...state,
        saveLoading: action.flag,
      };
    case LIST_PATIENTS:
      return {
        ...state,
        patients: action.list,
      };
    case TOTAL_LIST_PATIENTS:
      return {
        ...state,
        total: action.total,
      };
    case SELECTED_PATIENT:
      return {
        ...state,
        patientSelected: state.patients.find(a => a.id === action.selected) || null,
      };
    default:
      return state;
  }
};
