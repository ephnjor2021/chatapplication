import { ProcessReducer } from "./process";
import { combineReducers } from "redux";
const rootReducers = combineReducers({
  ProcessReducer: ProcessReducer,
});

export default rootReducers;
