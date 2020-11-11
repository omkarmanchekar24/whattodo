import {combineReducers} from 'redux';
import authReducer from './authReducer';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import taskReducer from './taskReducer';
import otpReducer from './otpReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  task: taskReducer,
  otp: otpReducer,
});

export default rootReducer;
