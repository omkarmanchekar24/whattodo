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
  OTP_LOADING,
  OTP_VERIFY,
  OTP_ERRORS,
} from './types';
import {Actions} from 'react-native-router-flux';
import {ip} from '../config/config';

export const register = (name, email, password) => {
  return (dispatch) => {
    dispatch(setRegisterLoading());

    axios
      .post(`${ip}/api/users/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        dispatch({
          type: Register_User,
        });
        Actions.otp({email: res.data.email});
      })
      .catch((err) =>
        dispatch({
          type: Register_Errors,
          payload: err.response.data,
        }),
      );
  };
};

export const verify = (email, verificationToken) => {
  return (dispatch) => {
    dispatch(setOtpLoading());

    axios
      .patch(`${ip}/api/users/verify`, {email, verificationToken})
      .then((res) => {
        dispatch({
          type: OTP_VERIFY,
        });
        Actions.auth();
        ToastAndroid.show('Email verification successfull!', ToastAndroid.LONG);
      })
      .catch((err) => {
        dispatch({
          type: OTP_ERRORS,
          payload: err.response.data,
        });
        console.log(err.response.data);
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setLoginLoading());

    axios
      .post(`${ip}/api/users/login`, {
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
        dispatch(setCurrentUser(decoded, token));

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

export const logout = () => {
  return (dispatch) => {
    setAuthToken(false);
    dispatch(setCurrentUser({}, null));
    Actions.auth();
    ToastAndroid.show('Logged out', ToastAndroid.LONG);
  };
};

//Set logged in user
export const setCurrentUser = (decoded, token) => {
  return {
    type: SET_CURRENT_USER,
    payload: {decoded, token},
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

export const setOtpLoading = () => {
  return {
    type: OTP_LOADING,
  };
};
