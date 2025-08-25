import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loadAuthors,
  addAuthor,
  editAuthor,
  removeAuthor
} from '../../redux/AuthorRedux/actions/authorActions';

const mapStateToProps = (state) => ({
  authors: state.authorState.authors,
  error: state.authorState.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { loadAuthors, addAuthor, editAuthor, removeAuthor },
    dispatch
  );

const AuthorApproval = (Component) =>
  connect(mapStateToProps, mapDispatchToProps)(Component);

export default AuthorApproval;
