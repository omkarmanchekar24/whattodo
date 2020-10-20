import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {Register_Loading, Register_User, Register_Errors} from './types';
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

export const login = (email, password) => {};

export const setRegisterLoading = () => {
  return {
    type: Register_Loading,
  };
};
