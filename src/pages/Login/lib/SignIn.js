import { faCircleUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { passwordRegex, usernameRegex } from '../../../helper/Regex';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ActionApproval from '../../../Containers/Authentication/ActionApproval';
import Input from '../../../components/Form/input/Input';
import PasswordInput from '../../../components/Form/password/Password';
// import logo from "../../../assets/images/logo/logo.png";
import Button from '../../../components/Form/button/Button';

const SignIn = ({ signInAction, AuthResponse, AuthError }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true); // only start validating on button click
    setLoginError('');

    let isValid = true;

    if (!username.trim() || !usernameRegex.test(username)) {
      isValid = false;
    }
    if (!password.trim() || !passwordRegex.test(password)) {
      isValid = false;
    } 

    if (!isValid) return;

    const credentials = { username, password };
    signInAction(credentials);
  };

  useEffect(() => {
    if (AuthResponse && AuthResponse.jwtToken) {
      navigate('/container/home');
    } else if (AuthError) {
      setLoginError(AuthError.message || 'Invalid Username & Password!');
      alert('Invalid Username & Password!');
    }
  }, [AuthResponse, AuthError, navigate]);

  return (
    <div className="signup_container">
      <div className="forms_container">
        {/* <div className='logo'>
          <img src={logo} alt="logo" />
          <div className='info'>
            <h1>Welcome <br /> to Villa Agency Pvt. Ltd.</h1>
            <p>
              Your journey to luxury living starts here <br />
              sign in to explore our exclusive properties.
            </p>
          </div>
        </div> */}

        <form className="sign_up_form" onSubmit={handleSubmit}>
          <h2 className="signup_title">Sign In</h2>

          <div className="input_field">
            <i><FontAwesomeIcon icon={faCircleUser} /></i>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              pattern={usernameRegex}
              errorMessage="Username must be 6–16 alphanumeric characters"
              validate={showErrors}
              variant="primaryInput"
            />
          </div>

          <div className="input_field">
            <i><FontAwesomeIcon icon={faLock} /></i>
            <PasswordInput
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern={passwordRegex}
              errorMessage="Password must meet complexity requirements"
              validate={showErrors}
              variant="AuthPage"
            />
          </div>

          {loginError && <p className="error-message">{loginError}</p>}

          <Button type="submit" className="btn solid" variant="AuthButton">
            Sign In
          </Button>

          <p className="msg">Don't have an account?</p>
          <Link to="/login/signup" className="msg_btn">Sign Up</Link>
        </form>
      </div>
    </div>
  );
};

export default ActionApproval(SignIn);











// import { faCircleUser, faLock } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { passwordRegex, usernameRegex } from '../../../helper/Regex';
// import { useEffect, useState } from 'react';
// // import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import  ActionApproval from '../../../Containers/Authentication/ActionApproval'
// import Input  from '../../../components/Form/input/Input';
// import PasswordInput from '../../../components/Form/password/Password';
// import logo from "../../../assets/images/logo/logo.png";
// import Button  from '../../../components/Form/button/Button';

// const SignIn = ({ signInAction , AuthResponse , AuthError }) => {
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginError, setLoginError] = useState('');

//   const handleUsernameChange = (e) => { 
//     const value = e.target.value;
//     setUsername(value);

//     if (value.trim() === '') {
//       setUsernameError('Please fill out the Username');
//     } else if (!usernameRegex.test(value)) {
//       setUsernameError('Username must be 6–16 alphanumeric characters');
//     } else {
//       setUsernameError('');
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);

//     if (value.trim() === '') {
//       setPasswordError('Please fill out the Password');
//     } else if (!passwordRegex.test(value)) {
//       setPasswordError('Password must meet complexity requirements');
//     } else {
//       setPasswordError('');
//     }
//   };

//   const handleSubmit = (e) => {
//   e.preventDefault();
//   setLoginError('');

//   let isValid = true;

//   if (username.trim() === '') {
//     setUsernameError('Please fill Username');
//     isValid = false;
//   } else if (!usernameRegex.test(username)) {
//     setUsernameError('Username must be 6–16 alphanumeric characters');
//     isValid = false;
//   }

//   if (password.trim() === '') {
//     setPasswordError('Please fill Password');
//     isValid = false;
//   } else if (!passwordRegex.test(password)) {
//     setPasswordError('Password must meet complexity requirements');
//     isValid = false;
//   }

//   if (!isValid) return;

//   const credentials = { username, password };

//   signInAction(credentials)
// };

//     useEffect(() => {
//       if(AuthResponse && AuthResponse.jwtToken){
//         navigate('/container/home');
//       }else if(AuthError){
//         setLoginError(AuthError.message);
//         alert('Invalid Username & Password!');
//       }
//     }, [AuthResponse , AuthError]);

//   return (
//     <div className="signup_container">
//       <div className="forms_container">
//         <div className='logo'>
//           <img src={logo}/>
//           <div>
//           <h1>Welcome <br/> to Villa Agency Pvt. Ltd.</h1>
//           <p>Your journey to luxury living starts here <br/> sign in to explore our exclusive properties.</p>
//           </div>
//         </div>
//         <form className="sign_up_form" onSubmit={handleSubmit}>
//           <h2 className="signup_title">Sign In</h2>

//           <div className="input_field">
//             <i><FontAwesomeIcon icon={faCircleUser} /></i>
//             <Input 
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={handleUsernameChange}
//               variant = "primaryInput"
//             />
//           </div>
//           {usernameError && <p className="error-message">{usernameError}</p>}

//           <div className="input_field">
//             <i><FontAwesomeIcon icon={faLock} /></i>
//             <PasswordInput
//               type="password"
//               placeholder="Password" 
//               value={password}
//               onChange={handlePasswordChange}
//               variant = "AuthPage"
//             />
//           </div>
//           {passwordError && <p className="error-message">{passwordError}</p>}

//           {loginError && <p className="error-message">{loginError}</p>}

//           <Button type="submit" className="btn solid" variant="AuthButton">Sign In</Button>

//           <p className="msg">Don't have an account?</p>
//           <Link to="/login/signup" className="msg_btn">Sign Up</Link>
//         </form>
//       </div>
//     </div>
//   );
// };


// export default ActionApproval(SignIn);
