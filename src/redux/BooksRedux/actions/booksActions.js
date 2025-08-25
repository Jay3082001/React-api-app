import axiosCall from '../../SwaggerUtilities/ApiAxiosCall';

const BOOK_PREFIX = 'Books/';

// Load All
export const loadBooks = () => {
  const path = `${BOOK_PREFIX}`;
  const responseType = 'LOAD_BOOKS';
  return axiosCall('get', path, responseType);
};

// Add
export const addBook = (book) => {
  const path = `${BOOK_PREFIX}`;
  const responseType = 'ADD_BOOK';
  return axiosCall('post', path, responseType, book);
};

// Update
export const editBook = (id, book) => {
  const path = `${BOOK_PREFIX}${id}`;
  const responseType = 'UPDATE_BOOK';
  return axiosCall('put', path, responseType, book);
};

// Delete
export const removeBook = (id) => {
  const path = `${BOOK_PREFIX}${id}`;
  const responseType = 'DELETE_BOOK';
  return axiosCall('delete', path, responseType, id);
};
