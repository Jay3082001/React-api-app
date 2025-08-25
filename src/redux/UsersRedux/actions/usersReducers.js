export default (state, action) => {
  if (typeof state === 'undefined') {
    return {};
  }

  switch (action.type) {
    case 'LOAD_USERS':
      return {
        ...state,
        users: action.updatePayload || []
      };

    case 'ADD_USER':
      return {
        ...state,
        users: [action.updatePayload, ...state.users]
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.updatePayload.id ? action.updatePayload : u
        )
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.updatePayload)
      };

    case 'LOAD_USERS_FAILED':
    case 'ADD_USER_FAILED':
    case 'UPDATE_USER_FAILED':
    case 'DELETE_USER_FAILED':
      return {
        ...state,
        error: action.updatePayload
      };

    default:
      return state;
  }
};
