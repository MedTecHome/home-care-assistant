export const initialLoginState = {
    user: null,
};

export const LoginReducers = (state, action) => {
  switch (action.type) {
      case 'SET_LOGIN_IN':
          return {
              ...state, user: action.user
          };
      default:
          return state;
  }
};