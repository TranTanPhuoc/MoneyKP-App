import { combineReducers } from 'redux';
import authReducer from './auth/authReducers';
import reloadReducer from './reload/reloadReducers';
const rootReducer = combineReducers({
  auth: authReducer,
  reload: reloadReducer,
});

export default rootReducer;