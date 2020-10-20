import {
  Register_User,
  Register_Loading,
  Register_Errors,
} from '../actions/types';

const Initial_State = {
  loading: false,
  errors: {},
};

export default (state = Initial_State, action) => {
  switch (action.type) {
    case Register_Loading:
      return {
        loading: true,
        errors: {},
      };
    case Register_User:
      return {
        loading: false,
        errors: {},
      };
    case Register_Errors:
      return {
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
