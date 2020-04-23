import {
  LIST_PROFILES,
  LIST_PROFILES_LOADING,
  SAVE_PROFILES_LOADING,
  SELECTED_PROFILE,
  SET_PROFILE_DOCTOR,
  SET_PROFILE_ROLE,
  SET_PROFILE_HOSPITAL,
  SET_PROFILE_USER,
} from '../../../commons/globalText';
import addOrReplace from '../../../commons/util';

export const initialProfilesState = {
  profiles: [],
  total: 0,
  profileSelected: null,
  usersProfile: [],
  doctorsProfile: [],
  hospitalsProfile: [],
  rolesProfile: [],
  loadingList: false,
  loadingSave: false,
};

export const ProfilesReducer = (state, action) => {
  switch (action.type) {
    case LIST_PROFILES_LOADING:
      return {
        ...state,
        listLoading: action.flag,
      };
    case LIST_PROFILES:
      return {
        ...state,
        profiles: action.list,
      };
    case SELECTED_PROFILE:
      return {
        ...state,
        profileSelected: state.profiles.find(a => a.id === action.selected) || null,
      };
    case SET_PROFILE_USER:
      return {
        ...state,
        usersProfile: addOrReplace(state.usersProfile, action.user),
      };
    case SET_PROFILE_DOCTOR:
      return {
        ...state,
        doctorsProfile: addOrReplace(state.doctorsProfile, action.doctor),
      };
    case SET_PROFILE_HOSPITAL:
      return {
        ...state,
        hospitalsProfile: addOrReplace(state.hospitalsProfile, action.hospital),
      };
    case SET_PROFILE_ROLE:
      return {
        ...state,
        rolesProfile: addOrReplace(state.rolesProfile, action.role),
      };
    case SAVE_PROFILES_LOADING:
      return {
        ...state,
        loadingSave: action.flag,
      };
    default:
      return state;
  }
};
