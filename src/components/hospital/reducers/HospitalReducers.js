import { LIST_HOSPITAL, LIST_HOSPITAL_LOADING, SELECTED_HOSPITAL } from '../../../commons/globalText';

export const initialHispitalState = {
  hospitals: [],
  total: 0,
  hospitalSelected: null,
  listLoading: false,
  saveLoading: false,
};

export const HospitalReducers = (state, action) => {
  switch (action.type) {
    case LIST_HOSPITAL:
      return {
        ...state,
        hospitals: action.list,
      };
    case LIST_HOSPITAL_LOADING:
      return {
        ...state,
        listLoading: action.flag,
      };
    case SELECTED_HOSPITAL:
      return {
        ...state,
        hospitalSelected: state.hospitals.find(a => a.id === action.selected) || null,
      };
    default:
      return state;
  }
};
