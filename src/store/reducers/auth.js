import {SIGNUP} from '../actions/auth';

const initialState = {
  accessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return state;
    default:
      return state;
  }
};
