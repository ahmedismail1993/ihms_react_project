import { combineReducers } from 'redux';

import userReducer from './UserReducer/index';
import serverErrors from './ErrorsReducer/index';

export default combineReducers({
  userReducer,
  serverErrors,
});
