// import { FETCH_USER } from './types';
// import axios from 'axios'
//
// export default function loginuser(values){
//
//     const res = axios.post('http://localhost:5000/authenticate',values).then(function (response) {
//     console.log(response);
//   })
//   dispatch()
//
//
//     return {
//       type:FETCH_USER,
//       payload:res
//   }
// }


// actions.js

// There are three possible states for our login
// process and we need actions for each of them
// export const LOGIN_REQUEST = 'LOGIN_REQUEST'
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// export const LOGIN_FAILURE = 'LOGIN_FAILURE'
//
// function requestLogin(creds) {
//   return {
//     type: LOGIN_REQUEST,
//     isFetching: true,
//     isAuthenticated: false,
//     creds
//   }
// }
//
// function receiveLogin(user) {
//   return {
//     type: LOGIN_SUCCESS,
//     isFetching: false,
//     isAuthenticated: true,
//     id_token: user.id_token
//   }
// }
//
// function loginError(message) {
//   return {
//     type: LOGIN_FAILURE,
//     isFetching: false,
//     isAuthenticated: false,
//     message
//   }
// }



import axios from 'axios'

export const AUTHENTICATED = 'auhenticated_user'
export const UNAUTHENTICATED = 'unauthenticated_user'
export const AUTHENTICATION_ERROR = 'authentication_error'

export function signInAction(values,history){
    return async (dispatch) => {
      try {
        const res = await axios.post('http://localhost:5000/authenticate',values)
        dispatch({type:AUTHENTICATED})
        localStorage.setItem('user',res.data.token)
        history.push('/profile')
      }
      catch(error){
        dispatch({
              type: AUTHENTICATION_ERROR,
              payload: 'Invalid email or password'
        });
      }
    }
}
