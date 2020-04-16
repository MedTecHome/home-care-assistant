export const initialHispitalState = {
  hospitals: [],
  total: 0,
  hospital: null,
};

export const HospitalReducers = (state, action) => {
  switch (action.type) {
    case 'LIST_HOSPITAL':
      return {
        ...state,
        hospitals: action.list,
        total: action.total,
      };
    case 'SELECTED_HOSPITAL':
      return {
        ...state,
        hospital: action.hospital,
      };
    default:
      return state;
  }
};
