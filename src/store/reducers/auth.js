import {AUTHENTICATE, LOGIN, SIGNUP} from '../actions/auth';

const initialState = {
  token: null,
  userId:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return state;
    case LOGIN:
      return {...state, token: action.token, userId: action.userId};
    case AUTHENTICATE:
      return {...state, token: action.token, userId: action.userId};
    default:
      return state;
  }
};
