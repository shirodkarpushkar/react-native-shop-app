import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
const API_KEY = 'AIzaSyC434QymeOQCtxn3DJPcJJ9VnSyZ-pVrxc';
const signupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const signinURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
export const signup = (email, password) => {
  return async dispatch => {
    try {
      const data = {
        email,
        password,
        returnSecureToken: true,
      };

      const res = await fetch(signupURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log('🚀 ~ file: auth.js ~ line 19 ~ return ~ result', result);

      dispatch({type: SIGNUP});
    } catch (error) {
      throw error;
    }
  };
};
export const login = (email, password) => {
  return async dispatch => {
    try {
      const data = {
        email,
        password,
        returnSecureToken: true,
      };

      const res = await fetch(signinURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error.message);
      }

      const token = result.idToken;
      const userId = result.localId;
      const expiryDate = new Date(
        new Date().getTime() + parseInt(result.expiresIn, 10) * 1000,
      ).toISOString();
      setStorage(token, userId, expiryDate);
      dispatch({type: LOGIN, token, userId});
    } catch (error) {
      throw error;
    }
  };
};
export const authenticate = (userId, token) => {
  return {type: AUTHENTICATE, token, userId};
};

const setStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate,
    }),
  );
};
