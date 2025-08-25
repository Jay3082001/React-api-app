import axios from 'axios';

const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1/';

const axiosCall = (method, path, responseType, data = null) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method,
        url: `${BASE_URL}${path}`,
        data,
      }); 

      const updatePayload = method.toLowerCase() === 'delete' ? data : res.data;

      dispatch({
        type: responseType,
        updatePayload,
      });
    } catch (error) {
      dispatch({
        type: `${responseType}_FAILED`,
        updatePayload: error.message || error,
      });
    }
  };
};

export default axiosCall;
