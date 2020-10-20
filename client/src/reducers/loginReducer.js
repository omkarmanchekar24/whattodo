import {Login_User, Login_Loading, Login_Errors} from '../actions/types';

const Initial_State = {
  loading: false,
  errors: {},
};

export default (state = Initial_State, action) => {
  switch (action.type) {
    case Login_Loading:
      return {
        loading: true,
        errors: {},
      };
    case Login_User:
      return {
        loading: false,
        errors: {},
      };
    case Login_Errors:
      return {
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
