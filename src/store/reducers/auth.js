import {AUTHENTICATE, LOGIN, LOGOUT, SIGNUP} from '../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return state;
    case LOGIN:
      return {...state, token: action.token, userId: action.userId};
    case LOGOUT:
      return {...state, token: null, userId: null};
    case AUTHENTICATE:
      return {...state, token: action.token, userId: action.userId};
    default:
      return state;
  }
};
