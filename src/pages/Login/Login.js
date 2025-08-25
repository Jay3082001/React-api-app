import './lib/login.scss';
import { Routes, Route } from 'react-router-dom'; 
import SignUp from './lib/SignUp';
import SignIn from './lib/SignIn';

const Login = () => {
  return (
    <div>
      <Routes>
        <Route path="signin" element={<SignIn />}/>
        <Route path="signup" element={<SignUp />}/>
      </Routes>
    </div>
  );
};

export default Login;















// const Login = () => {
//   const [formType, setFormType] = useState("signin");

//   const renderForm = () => {
//     switch (formType) {
//       case "signin":
//         return <SignIn onSwitchForm={setFormType} />;
//       case "signup":
//         return <SignUp onSwitchForm={setFormType} />;
//       default:
//         return <SignIn onSwitchForm={setFormType} />;
//     }
//   };

//   return <div>{renderForm()}</div>;
// };


// export default Login



// const Login = () => {

//   const [form, setForm] = useState("signin");

//   return (
//     <div>
//       {form === "signin" && <SignIn onSwitchForm={setForm}/>}
//       {form === "signup" && <SignUp onSwitchForm={setForm}/>}
//     </div>
//   )
// }

// export default Login;