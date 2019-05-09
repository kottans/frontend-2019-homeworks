import { combineReducers } from "redux";
import { unsplash } from "./unsplash";
import { auth } from "./auth";

export default combineReducers({
  unsplash: unsplash,
  auth: auth
});
