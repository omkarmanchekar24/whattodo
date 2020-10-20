import {combineReducers} from 'redux';
import authReducer from './authReducer';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
});

export default rootReducer;
