import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, registering: true };
    case REGISTER_SUCCESS:
      return {};
    case REGISTER_FAILURE:
      return { ...state, error: action.payload };
  }
  return state;
}
