import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error)
    switch(error.response.status) {
      case 500:
        alert("OOPS!!! SOMETHING WENT WRONG")
        break;
      case 401:
        alert("YOU HAVE NOT REGISTERED")
        break;
      case 400:
        alert("INCORRECT PASSWORD")
        break;
      default:
        // code block
    } 
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);  

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
    switch(error.response.status) {
      case 500:
        alert("OOPS!!! SOMETHING WENT WRONG")
        break;
      case 400:
        alert("USER ALREADY EXISTS ")
        break;
      default:
        // code block
    } 
  }
};
