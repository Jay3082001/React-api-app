export default (state, action) => {
  if (typeof state === 'undefined') {
    return {};
  }

  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        AuthResponse: action.updatePayload
      };

    case 'LOGIN_FAILED':  
    case 'SIGNUP_SUCCESS_FAILED': 
      return {
        ...state,
        AuthError: action.updatePayload
      };
 
    case 'LOGOUT':
      return {
        ...state,
        LogoutResponse: action.updatePayload
      };

    default:
      return state;
  }
};
