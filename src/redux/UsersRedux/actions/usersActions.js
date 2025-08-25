import axiosCall from '../../SwaggerUtilities/ApiAxiosCall';

const USER_PREFIX = 'Users/';

// Load All
export const loadUsers = () => {
  const path = `${USER_PREFIX}`;
  const responseType = 'LOAD_USERS';
  return axiosCall('get', path, responseType);
};

// Add
export const addUser = (user) => {
  const path = `${USER_PREFIX}`;
  const responseType = 'ADD_USER';
  return axiosCall('post', path, responseType, user);
};

// Update
export const editUser = (id, user) => {
  const path = `${USER_PREFIX}${id}`;
  const responseType = 'UPDATE_USER';
  return axiosCall('put', path, responseType, user);
};

// Delete
export const removeUser = (id) => {
  const path = `${USER_PREFIX}${id}`;
  const responseType = 'DELETE_USER';
  return axiosCall('delete', path, responseType, id);
};
