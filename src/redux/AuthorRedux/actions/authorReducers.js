export default (state, action) => {
  if (typeof state === 'undefined') {
    return {};
  }

  switch (action.type) {
    case 'LOAD_AUTHORS':
      return {
        ...state,
        authors: action.updatePayload || []
      };

    case 'ADD_AUTHOR':
      return {
        ...state,
        authors: [action.updatePayload, ...state.authors ]
      };

    case 'UPDATE_AUTHOR': 
      return {
        ...state,
        authors: state.authors.map(a =>
          a.id === action.updatePayload.id ? action.updatePayload : a
        )
      };

    case 'DELETE_AUTHOR':
      return {
        ...state,
        authors: state.authors.filter(a => a.id !== action.updatePayload)
      };

    case 'LOAD_AUTHORS_FAILED':
    case 'ADD_AUTHOR_FAILED':
    case 'UPDATE_AUTHOR_FAILED':
    case 'DELETE_AUTHOR_FAILED':
      return {
        ...state,
        error: action.updatePayload
      };

    default:
      return state;
  }
};
