import { LIST_DOCTORS, SELECTED_DOCTORS } from '../../../commons/globalText';

export const initialDoctorsState = {
  doctors: [],
  doctorsSelected: null,
};

export const DoctorsReducer = (state, action) => {
  switch (action.type) {
    case LIST_DOCTORS:
      return {
        ...state,
        doctors: action.list,
      };
    case SELECTED_DOCTORS:
      return {
        ...state,
        doctorsSelected: state.doctors.filter(a => action.selected.some(b => b === a.id)),
      };
    default:
      return state;
  }
};
