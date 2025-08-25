import { combineReducers } from 'redux';
import authReducer from '../redux/LoginRedux/actions/authReducers';
import activityReducer from './ActivityRedux/actions/activityReducers';
import authorReducer from './AuthorRedux/actions/authorReducers';
import bookReducer from './BooksRedux/actions/booksReducers';
import userReducer from './UsersRedux/actions/usersReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  activityState: activityReducer,
  authorState: authorReducer, 
  bookState: bookReducer,
  userState: userReducer,
});

export default rootReducer; 