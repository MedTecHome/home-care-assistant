import { SET_PROFILE_FILTER } from '../../../commons/globalText';

export const initialProfileFiltersState = {
  filters: {},
};

export const ProfileFiltersReducer = (state, action) => {
  switch (action.type) {
    case SET_PROFILE_FILTER:
      return {
        ...state,
        filters: action.filters,
      };
    default:
      return state;
  }
};
