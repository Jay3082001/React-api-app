// src/containers/BooksBindActions/BooksApproval.js
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loadBooks,
  addBook,
  editBook,
  removeBook
} from '../../redux/BooksRedux/actions/booksActions';

const mapStateToProps = (state) => ({
  books: state.bookState.books,
  error: state.bookState.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { loadBooks, addBook, editBook, removeBook },
    dispatch
  );

const BooksApproval = (Component) =>
  connect(mapStateToProps, mapDispatchToProps)(Component);

export default BooksApproval;
