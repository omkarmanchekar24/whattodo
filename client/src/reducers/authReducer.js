import {SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../validation/is-empty';

const Initial_State = {
  isAuthenticated: false,
  user: {},
  token: null,
};

export default (state = Initial_State, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload.decoded),
        user: action.payload.decoded,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
