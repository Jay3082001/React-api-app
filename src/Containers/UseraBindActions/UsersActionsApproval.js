import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUsers, addUser, editUser, removeUser } from '../../redux/UsersRedux/actions/usersActions';

const mapStateToProps = (state) => ({
  users: state.userState.users,
  error: state.userState.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loadUsers, addUser, editUser, removeUser }, dispatch);

const UserApproval = (Component) => connect(mapStateToProps, mapDispatchToProps)(Component);

export default UserApproval; 
