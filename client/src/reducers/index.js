import {combineReducers} from 'redux';
import authReducer from './authReducer';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  task: taskReducer,
});

export default rootReducer;
