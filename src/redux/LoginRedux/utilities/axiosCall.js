import axios from 'axios';

const BASE_URL = 'http://localhost:7000/';

const axiosCall = (
  method,
  path,
  responseType,
  data = null,
  headers = {},
  handlerType = null
) => {
  return async (dispatch) => { 
    try {
      // Handle logout specifically before the API call
      if (handlerType === 'logout') {
        localStorage.removeItem('U_TOKENS');
        dispatch({ type: 'LOGIN_SUCCESS' , updatePayload: null}); 
        dispatch({ type: 'LOGOUT', updatePayload: null });
        try {
          await axios({
            method,
            url: `${BASE_URL}${path}`, 
            data,
            headers
          });
        } catch (logoutError) {
          console.error('Server-side logout failed:', logoutError);
          dispatch({
            type: `${responseType}_FAILED`,
            updatePayload: { message: 'Server logout failed' }
          });
        }
        return; 
      }

      const response = await axios({
        method,
        url: `${BASE_URL}${path}`,
        data,
        headers
      });

      let responseData = response.data;

      // Built-in login handling logic
      if (handlerType === 'login') {
        if (!Array.isArray(responseData) || responseData.length === 0) {
          dispatch({
            type: 'LOGIN_FAILED',
            updatePayload: { message: 'Invalid credentials' }
          });
          return;
        }

        const user = responseData[0];
        responseData = {
          ...user,
          jwtToken: 'FAKE_JWT_TOKEN_' + new Date().getTime() // This is a mock token, replace with actual token generation
        };
      }

      dispatch({
        type: responseType,
        updatePayload: responseData
      });

      // Save JWT and token on login
      if (responseType === 'LOGIN_SUCCESS' && responseData.jwtToken) {
        localStorage.setItem('U_TOKENS', JSON.stringify(responseData));
      }

    } catch (error) {
      const errorPayload =
        error.response?.data || { message: error.message || 'Unknown error' };

      const failureType = responseType.endsWith('_SUCCESS')
        ? responseType.replace('_SUCCESS', '_FAILED')
        : `${responseType}_FAILED`;

      dispatch({
        type: failureType,
        updatePayload: errorPayload
      });

      console.error(`Error in ${responseType}:`, errorPayload);
    }
  };
};

export default axiosCall;











// import axios from 'axios';

// const BASE_URL = 'http://localhost:7000/';

// const axiosCall = (
//   method,
//   path,
//   responseType,
//   data = null,
//   headers = {},
//   handlerType = null // use 'login' to handle login specifically
// ) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios({
//         method,
//         url: `${BASE_URL}${path}`,
//         data,
//         headers
//       });

//       let responseData = response.data;

//       // 🔐 Built-in login handling logic
//       if (handlerType === 'login') {
//         if (!Array.isArray(responseData) || responseData.length === 0) {
//           dispatch({
//             type: 'LOGIN_FAILED',
//             updatePayload: { message: 'Invalid credentials' }
//           });
//           return;
//         }

//         const user = responseData[0];
//         responseData = {
//           ...user,
//           jwtToken: 'FAKE_JWT_TOKEN_' + new Date().getTime()
//         };
//       }

//       dispatch({
//         type: responseType,
//         updatePayload: responseData
//       });

//       // Save JWT and token on login
//       if (responseType === 'LOGIN_SUCCESS' && responseData.jwtToken) {
//         localStorage.setItem('U_TOKENS', JSON.stringify(responseData));
//       }

//     } catch (error) {
//       const errorPayload =
//         error.response?.data || { message: error.message || 'Unknown error' };

//       const failureType = responseType.endsWith('_SUCCESS')
//         ? responseType.replace('_SUCCESS', '_FAILED')
//         : `${responseType}_FAILED`;

//       dispatch({
//         type: failureType,
//         updatePayload: errorPayload
//       });

//       console.error(`Error in ${responseType}:`, errorPayload);
//     }
//   };
// };

// export default axiosCall;
