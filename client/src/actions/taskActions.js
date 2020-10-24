import {ToastAndroid} from 'react-native';
import axios from 'axios';
import {
  TASK_LOADING,
  GET_TASKS,
  GET_TASKS_FAILED,
  ADD_TASK,
  ADD_TASK_FAILED,
  DELETE_TASK,
  DELETE_TASK_ERROR,
} from './types';
import {ip} from '../config/config';
import {Actions} from 'react-native-router-flux';

export const getTasks = (id) => {
  return (dispatch) => {
    dispatch(setTaskLoading());
    axios
      .get(`${ip}/api/tasks/${id}`)
      .then((res) =>
        dispatch({
          type: GET_TASKS,
          payload: res.data,
        }),
      )
      .catch((err) =>
        dispatch({
          type: GET_TASKS_FAILED,
          payload: err.response.data,
        }),
      );
  };
};

export const addTask = (user, name, date) => {
  return (dispatch) => {
    dispatch(setTaskLoading());
    axios
      .post(`${ip}/api/tasks/addtask`, {user, text: name, date})
      .then((res) => {
        dispatch({
          type: ADD_TASK,
          payload: res.data,
        });
        Actions.welcome();
      })
      .catch((err) => {
        dispatch({
          type: ADD_TASK_FAILED,
          payload: err.response.data,
        });
        ToastAndroid.show('Something went wrong! Please try again later');
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    axios
      .delete(`${ip}/api/tasks/${id}`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: DELETE_TASK,
          payload: id,
        });
      })
      .catch((err) =>
        dispatch({
          type: DELETE_TASK_ERROR,
          payload: err.response.data,
        }),
      );
  };
};

export const setTaskLoading = () => {
  return {
    type: TASK_LOADING,
  };
};
