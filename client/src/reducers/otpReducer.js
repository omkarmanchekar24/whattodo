import {
  OTP_LOADING,
  OTP_ERRORS,
  OTP_VERIFY,
  RESEND_LOADING,
  RESEND_OTP,
} from '../actions/types';

const Initial_State = {
  loading: false,
  resendLoading: false,
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
    case RESEND_LOADING:
      return {
        ...state,
        resendLoading: true,
        errors: {},
      };
    case RESEND_OTP:
      return {
        ...state,
        resendLoading: false,
        errors: {},
      };
    default:
      return state;
  }
};
