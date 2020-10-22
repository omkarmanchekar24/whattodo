import axios from 'axios';
import {
  GET_TASKS,
  GET_TASKS_FAILED,
  DELETE_TASK,
  DELETE_TASK_ERROR,
} from './types';
import {ip} from '../config/config';

export const getTasks = (id) => {
  return (dispatch) => {
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

export const addTask = (name, todoAt) => {};

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
