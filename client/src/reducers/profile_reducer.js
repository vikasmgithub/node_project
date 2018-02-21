import { PROFILE_COMES, PROFILE_LOAD_FAIL } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case PROFILE_COMES:
      return { ...state, profile: action.payload };
    case PROFILE_LOAD_FAIL:
      return { ...state, error: "something goes wrong" };
    default:
      return state;
  }
}
