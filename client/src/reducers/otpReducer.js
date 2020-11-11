import {OTP_LOADING, OTP_ERRORS, OTP_VERIFY} from '../actions/types';

const Initial_State = {
  loading: false,
  errors: {},
};

export default (state = Initial_State, action) => {
  switch (action.type) {
    case OTP_LOADING:
      return {
        loading: true,
        errors: {},
      };
    case OTP_VERIFY:
      return {
        loading: false,
        errors: {},
      };
    case OTP_ERRORS:
      return {
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
