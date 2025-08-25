import axiosCall from '../../LoginRedux/utilities/axiosCall';

const AUTH_PREFIX = 'users/'; 

// Sign In
export const signInAction = (credentials) => {
  const path = `${AUTH_PREFIX}?username=${credentials.username}&password=${credentials.password}`;
  const responseType = 'LOGIN_SUCCESS';
  return axiosCall('get', path, responseType, null, {}, 'login');
};

// Sign Up
export const signUpAction = (userData) => {
  const path = `${AUTH_PREFIX}`; 
  const responseType = 'SIGNUP_SUCCESS';
  return axiosCall('post', path, responseType, userData);
};

// Logout
export const logoutAction = () => { 
  const path = `${AUTH_PREFIX}`; 
  const responseType = 'LOGOUT';
  return axiosCall('post', path, responseType, null, {}, 'logout');
};
