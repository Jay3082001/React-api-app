import { faCircleUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { passwordRegex, usernameRegex, emailRegex } from '../../../helper/Regex';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActionApproval from '../../../Containers/Authentication/ActionApproval';
import Input from '../../../components/Form/input/Input';
import PasswordInput from '../../../components/Form/password/Password';
// import logo from "../../../assets/images/logo/logo.png";
import Button from '../../../components/Form/button/Button';

const SignUp = ({ signUpAction, AuthResponse, AuthError }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true); // only validate after button click

    let isValid = true;

    if (!username.trim() || !usernameRegex.test(username)) {
      isValid = false;
    }

    if (!email.trim() || !emailRegex.test(email)) {
      isValid = false;
    }

    if (!password.trim() || !passwordRegex.test(password)) {
      isValid = false;
    }

    if (!isValid) return;

    const newUser = { username, email, password };
    signUpAction(newUser);
  };

  useEffect(() => {
    if (AuthResponse) {
      // alert('Signup Successfully! Now you can login.');
      setSignupSuccess(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setShowErrors(false);
    } else if (AuthError) {
      console.error(AuthError.message || 'Signup Failed');
    }
  }, [AuthResponse, AuthError]);

  return (
    <div className="signup_container">
      <div className="forms_container">
        {/* <div className='logo'>
          <img src={logo} alt="logo" />
          <h1>Join With <br /> Villa Agency Pvt. Ltd.</h1>
          <p>
            Start your journey toward luxury living <br />
            register with us today.
          </p>
        </div> */}

        <form className="sign_up_form" onSubmit={handleSubmit}>
          <h2 className="signup_title">Sign Up</h2>

          {signupSuccess && (
            <div style={{ color: '#6cc019' }}>
              <h2>SignUp Successfully</h2>
              <p>
                You can now :{' '}
                <Link to="/login/signin" className='signupSuccesslink'>
                  Login
                </Link>
              </p>
            </div>
          )}

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
            <i><FontAwesomeIcon icon={faEnvelope} /></i>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern={emailRegex}
              errorMessage="Please enter a valid email address"
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
              errorMessage="Password must be at least 8 characters, with uppercase, lowercase, number, and special character"
              validate={showErrors}
              variant="AuthPage"
            />
          </div>

          <Button type="submit" className="btn solid" variant="AuthButton">
            Sign Up
          </Button>

          <p className="msg">Already have an account?</p>
          <Link to="/login/signin" className="msg_btn">Sign In</Link>
        </form>
      </div>
    </div>
  );
};

export default ActionApproval(SignUp);





















// import { faCircleUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { passwordRegex, usernameRegex, emailRegex } from '../../../helper/Regex';
// import { useEffect, useState } from 'react';
// // import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import  ActionApproval from '../../../Containers/Authentication/ActionApproval'
// import Input  from '../../../components/Form/input/Input';
// import PasswordInput from '../../../components/Form/password/Password';
// import logo from "../../../assets/images/logo/logo.png";
// import Button from '../../../components/Form/button/Button';

// const SignUp = ({ signUpAction , AuthResponse , AuthError }) => {
//   // const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const [username, setUsername] = useState(''); 
//   const [usernameError, setUsernameError] = useState('');
//   const [email, setEmail] = useState(''); 
//   const [emailError, setEmailError] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [signupSuccess, setSignupSuccess] = useState(false);

//   const handleUsernameChange = (e) => {
//     const value = e.target.value; 
//     setUsername(value);

//     if (value.trim() === '') {
//       setUsernameError('Please fill out the Username');
//     } else if (!usernameRegex.test(value)) {
//       setUsernameError('Username must be 6-16 alphanumeric characters');
//     } else {
//       setUsernameError('');
//     }
//   };

//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);

//     if (value.trim() === '') {
//       setEmailError('Please fill out the Email');
//     } else if (!emailRegex.test(value)) {
//       setEmailError('Please enter a valid email address');
//     } else {
//       setEmailError('');
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);

//     if (value.trim() === '') {
//       setPasswordError('Please fill out the Password');
//     } else if (!passwordRegex.test(value)) {
//       setPasswordError(
//         'Password must be at least 8 characters, with uppercase, lowercase, number, and special character'
//       );
//     } else {
//       setPasswordError('');
//     }
//   };

//   const handleSubmit = (e) => {
//   e.preventDefault();

//   let isValid = true;

//   if (username === '' || !usernameRegex.test(username)) {
//     setUsernameError('Username must be 6-16 alphanumeric characters');
//     isValid = false;
//   }

//   if (email === '' || !emailRegex.test(email)) {
//     setEmailError('Please enter a valid email address');
//     isValid = false;
//   }

//   if (password === '' || !passwordRegex.test(password)) {
//     setPasswordError(
//       'Password must be at least 8 characters, with uppercase, lowercase, number, and special character'
//     );
//     isValid = false;
//   }

//   if (!isValid) return;

//   const newUser = { username, email, password };

//   signUpAction(newUser)
//     // .then(() => {
//     //   alert('Signup successful! You can now login.');
//     //   setSignupSuccess(true);
//     //   setUsername('');
//     //   setEmail('');
//     //   setPassword('');
//     // })
//     // .catch((err) => {
//     //   console.error('Signup error:', err);
//     //   alert('Signup failed. Please try again.');
//     // });
// };

//     useEffect(() => {
//       if(AuthResponse){
//         alert('Signup SuccessFully! Now you can login.')
//         setSignupSuccess(true);
//         setUsername('');
//         setEmail('');
//         setPassword('');
//       }else if(AuthError){
//         console.error(AuthError.message || 'Signup Failed');
//       }
//     }, [AuthResponse , AuthError]);

//   return (
//     <div className="signup_container">
//       <div className="forms_container">
//         <div className='logo'>
//           <img src={logo}/>
//           <h1>Join With <br/> Villa Agency Pvt. Ltd.</h1>
//           <p>Start your journey toward luxury living <br/> register with us today.</p>
//         </div>
//         <form className="sign_up_form" onSubmit={handleSubmit}>
//           <h2 className="signup_title">Sign Up</h2>

//           {signupSuccess && 
//               <div style={{color:'#6cc019'}}>
//                 <h2>SugnUp Successfully</h2>
//                 <p>You can now : <Link to="/login/signin" className='signupSuccesslink'>Login</Link></p>
//               </div>
//           }

//           <div className="input_field">
//             <i><FontAwesomeIcon icon={faCircleUser} /></i>
//             <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} variant = "primaryInput"/>
//           </div>
//           {usernameError && <p className="error-message">{usernameError}</p>}

//           <div className="input_field">
//             <i><FontAwesomeIcon icon={faEnvelope} /></i>
//             <Input type="text" placeholder="Email" value={email} onChange={handleEmailChange} variant = "primaryInput"/>
//           </div>
//           {emailError && <p className="error-message">{emailError}</p>}

//           <div className="input_field">
//             <i><FontAwesomeIcon icon={faLock} /></i>
//             <PasswordInput type="password" placeholder="Password" value={password} onChange={handlePasswordChange} variant = "AuthPage"/>
//           </div>
//           {passwordError && <p className="error-message">{passwordError}</p>}

//           <Button type="submit" className="btn solid" variant="AuthButton">Sign Up</Button>

//           <p className="msg">Already have an account?</p>
//           <Link to="/login/signin" className="msg_btn">Sign In</Link>

//         </form>
//       </div>
//     </div>
//   );
// };



// export default ActionApproval(SignUp);
