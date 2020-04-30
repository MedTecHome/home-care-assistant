import {
  LIST_PROFILES,
  LIST_PROFILES_LOADING,
  SELECTED_PROFILE,
  LIST_PROFILES_NOMENCLADOR,
} from '../../../commons/globalText';

export const initialProfilesState = {
  profiles: [],
  doctorsNomenclador: [],
  total: 0,
  profileSelected: null,
  loadingList: false,
  loadingSave: false,
};

export const ProfilesReducer = (state, action) => {
  switch (action.type) {
    case LIST_PROFILES_LOADING:
      return {
        ...state,
        loadingList: action.flag,
      };
    case LIST_PROFILES:
      return {
        ...state,
        profiles: action.list,
      };
    case LIST_PROFILES_NOMENCLADOR:
      return {
        ...state,
        doctorsNomenclador: action.list,
      };
    case SELECTED_PROFILE:
      return {
        ...state,
        profileSelected: state.profiles.find(a => a.id === action.selected) || null,
      };
    default:
      return state;
  }
};
