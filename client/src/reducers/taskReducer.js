import {
  GET_TASKS,
  GET_TASKS_FAILED,
  DELETE_TASK,
  DELETE_TASK_ERROR,
} from '../actions/types';

const Initial_State = {
  tasks: null,
  errors: {},
};

export default (state = Initial_State, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        errors: {},
      };
    case GET_TASKS_FAILED:
      return {
        ...state,
        errors: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => {
          return item._id !== action.payload;
        }),
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
