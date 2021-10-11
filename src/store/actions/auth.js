export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
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
      console.log('🚀 ~ file: auth.js ~ line 19 ~ return ~ result', result);

      dispatch({type: LOGIN});
    } catch (error) {
      throw error;
    }
  };
};
