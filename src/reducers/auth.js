import { AUTH, LOGOUT } from "../constants/actionTypes.js";
const authReducer = (state={authData:null}, action) => {
  switch (action.type) {
    case AUTH:
      console.log("Receive message",action.data)
      localStorage.setItem('profile',JSON.stringify({...action?.data}))
      return {...state, authData:action?.data};
    case LOGOUT:
      localStorage.clear();
      return {...state, autData: null};
    default:
      return state;
  }
};

export default authReducer;
