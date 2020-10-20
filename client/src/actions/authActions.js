import axios from 'axios';
import {ToastAndroid} from 'react-native';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
  Register_Loading,
  Register_User,
  Register_Errors,
  Login_Loading,
  Login_User,
  Login_Errors,
  SET_CURRENT_USER,
} from './types';
import {Actions} from 'react-native-router-flux';

export const register = (name, email, password) => {
  return (dispatch) => {
    dispatch(setRegisterLoading());

    axios
      .post('http://192.168.0.12:5000/api/users/register', {
        name,
        email,
        password,
      })
      .then((res) => {
        dispatch({
          type: Register_User,
        });
        Actions.login();
        ToastAndroid.show('Registered Successfully!', ToastAndroid.LONG);
      })
      .catch((err) =>
        dispatch({
          type: Register_Errors,
          payload: err.response.data,
        }),
      );
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setLoginLoading());

    axios
      .post('http://192.168.0.12:5000/api/users/login', {
        email,
        password,
      })
      .then((res) => {
        const {token} = res.data;

        //Set token to auth header
        setAuthToken(token);

        //Decode token to get user data
        const decoded = jwt_decode(token);

        //Set current user
        dispatch(setCurrentUser(decoded));

        dispatch({
          type: Login_User,
        });
        Actions.welcome();
        ToastAndroid.show('Logged in Successfully!', ToastAndroid.LONG);
      })
      .catch((err) =>
        dispatch({
          type: Login_Errors,
          payload: err.response.data,
        }),
      );
  };
};

//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setRegisterLoading = () => {
  return {
    type: Register_Loading,
  };
};

export const setLoginLoading = () => {
  return {
    type: Login_Loading,
  };
};
