import {
  TASK_LOADING,
  GET_TASKS,
  GET_TASKS_FAILED,
  ADD_TASK,
  ADD_TASK_FAILED,
  DELETE_TASK,
  DELETE_TASK_ERROR,
} from '../actions/types';

const Initial_State = {
  tasks: null,
  loading: false,
  errors: {},
};

export default (state = Initial_State, action) => {
  switch (action.type) {
    case TASK_LOADING:
      return {
        ...state,
        loading: true,
        errors: {},
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        errors: {},
      };
    case GET_TASKS_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case ADD_TASK:
      return {
        ...state,
        loading: true,
        errors: {},
      };
    case ADD_TASK_FAILED:
      return {
        ...state,
        loading: false,
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
