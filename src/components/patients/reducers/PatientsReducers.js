import { LIST_PATIENTS, SELECTED_PATIENTS, SET_TYPE_FORM } from '../../../commons/globalText';

export const initialPatientsState = {
  patients: [],
  total: 0,
  patientsSelected: null,
  formType: null,
};

export const PatientsReducers = (state, action) => {
  switch (action.type) {
    case SET_TYPE_FORM:
      return {
        ...state,
        formType: action.formType,
      };
    case LIST_PATIENTS:
      return {
        ...state,
        patients: action.list,
        total: action.total,
      };
    case SELECTED_PATIENTS:
      return {
        ...state,
        patientsSelected: state.patients.filter(a => action.selected.some(b => b === a.id)),
      };
    default:
      return state;
  }
};
