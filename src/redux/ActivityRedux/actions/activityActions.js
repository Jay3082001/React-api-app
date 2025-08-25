import axiosCall from '../../SwaggerUtilities/ApiAxiosCall';

const ACTIVITY_PREFIX = 'activities/';

// Load All
export const loadActivities = () => {
  const path = `${ACTIVITY_PREFIX}`;
  const responseType = 'LOAD_ACTIVITIES';
  return axiosCall('get', path, responseType);
};

// Add
export const addActivity = (activity) => { 
  const path = `${ACTIVITY_PREFIX}`; 
  const responseType = 'ADD_ACTIVITY'; 
  return axiosCall('post', path, responseType, activity);
};

// Update
export const editActivity = (id, activity) => {
  const path = `${ACTIVITY_PREFIX}${id}`;
  const responseType = 'UPDATE_ACTIVITY';
  return axiosCall('put', path, responseType, activity);
};

// Delete
export const removeActivity = (id) => {
  const path = `${ACTIVITY_PREFIX}${id}`;
  const responseType = 'DELETE_ACTIVITY';
  return axiosCall('delete', path, responseType, id);
};
