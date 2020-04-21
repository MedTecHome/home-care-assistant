import {
  LIST_HOSPITAL,
  LIST_HOSPITAL_LOADING,
  SAVE_HOSPITAL_LOADING,
  SELECTED_HOSPITAL,
  TOTAL_LIST_HOSPITAL,
} from '../../../commons/globalText';

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
    case TOTAL_LIST_HOSPITAL:
      return {
        ...state,
        total: action.total,
      };
    case LIST_HOSPITAL_LOADING:
      return {
        ...state,
        listLoading: action.flag,
      };
    case SAVE_HOSPITAL_LOADING:
      return {
        ...state,
        saveLoading: action.flag,
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
