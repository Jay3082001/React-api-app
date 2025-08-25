import axiosCall from '../../SwaggerUtilities/ApiAxiosCall';

const AUTHOR_PREFIX = 'Authors/';

// Load All
export const loadAuthors = () => {
  const path = `${AUTHOR_PREFIX}`;
  const responseType = 'LOAD_AUTHORS';
  return axiosCall('get', path, responseType);
};

// Add
export const addAuthor = (author) => {
  const path = `${AUTHOR_PREFIX}`; 
  const responseType = 'ADD_AUTHOR';
  return axiosCall('post', path, responseType, author);
};

// Update
export const editAuthor = (id, author) => {
  const path = `${AUTHOR_PREFIX}${id}`;
  const responseType = 'UPDATE_AUTHOR';
  return axiosCall('put', path, responseType, author);
};

// Delete
export const removeAuthor = (id) => {
  const path = `${AUTHOR_PREFIX}${id}`;
  const responseType = 'DELETE_AUTHOR'; 
  return axiosCall('delete', path, responseType, id);
};
