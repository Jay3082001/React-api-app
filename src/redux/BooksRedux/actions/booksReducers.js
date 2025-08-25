export default (state, action) => {
  if (typeof state === 'undefined') {
    return {};
  }

  switch (action.type) {
    case 'LOAD_BOOKS':
      return {
        ...state,
        books: action.updatePayload || []
      };

    case 'ADD_BOOK':
      return {
        ...state,
        books: [action.updatePayload, ...state.books]
      };

    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(b =>
          b.id === action.updatePayload.id ? action.updatePayload : b
        )
      };

    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(b => b.id !== action.updatePayload)
      };

    case 'LOAD_BOOKS_FAILED':
    case 'ADD_BOOK_FAILED':
    case 'UPDATE_BOOK_FAILED':
    case 'DELETE_BOOK_FAILED':
      return {
        ...state,
        error: action.updatePayload
      };

    default:
      return state;
  }
};
