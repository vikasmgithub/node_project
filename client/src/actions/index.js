import axios from "axios";

export const AUTHENTICATED = "auhenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";
export const REGISTER_REQUEST = "USERS_REGISTER_REQUEST";
export const REGISTER_SUCCESS = "USERS_REGISTER_SUCCESS";
export const REGISTER_FAILURE = "USERS_REGISTER_FAILURE";
export const PROFILE_COMES = "PROFILE_COMES";
export const PROFILE_LOAD_FAIL = "PROFILE_FAIL";


export const signInAction = (values, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:5000/authenticate", values);
    dispatch({ type: AUTHENTICATED });
    localStorage.setItem("user",res.data.token);
    history.push("/secret");
  } catch (error) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: "Invalid email or password"
    });
  }
};

export const signUpAction = (values, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:5000/register", values);
    dispatch({ type: REGISTER_SUCCESS });
    history.push("/signin");
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: "There is something wrong"
    });
  }
};

export const profileRequest = values => async dispatch => {
  var x=values.Authorization;
  try {
    const res = await axios.get("http://localhost:5000/profile", {
      headers: {Authorization:x}
    });
    dispatch({ type: PROFILE_COMES,
      payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_LOAD_FAIL,
      payload: "there is error"
    });
  }
};
