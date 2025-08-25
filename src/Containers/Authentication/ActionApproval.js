import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signInAction, signUpAction, logoutAction } from '../../redux/LoginRedux/actions/authActions';

const mapStateToProps = (state) => ({
  AuthResponse: state.auth.AuthResponse,
  AuthError: state.auth.AuthError,
  LogoutResponse: state.auth.LogoutResponse,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      signInAction, 
      signUpAction,
      logoutAction
    },
    dispatch
  );
  
  const ActionApproval = (Component) => connect(mapStateToProps, mapDispatchToProps)(Component);
  
  export default ActionApproval;

  
// const ActionApproval = connect( mapStateToProps, mapDispatchToProps )(Login);











// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { signInAction, signUpAction, logoutAction } from '../../redux/actions/authActions'; 

// // Tack required state from reducer to props 
// const mapStateToProps = (state) => ({
//   AuthResponse: state.auth.AuthResponse,
//   AuthError: state.auth.AuthError,
//   LogoutResponse: state.auth.LogoutResponse
// });

// // Bind action creators to dispatch 
// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   signInAction,
//   signUpAction,
//   logoutAction
// }, dispatch);

// // Connect to Component 
// const ActionApproval = (Component) => connect(mapStateToProps, mapDispatchToProps)(Component);

// export default ActionApproval;