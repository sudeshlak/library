import {combineReducers} from "redux";
import booksReducer from "./booksReducer";
import authorReducer from "./authorReducer";

const reducers=combineReducers({
  books:booksReducer,
  authors:authorReducer
});

export default reducers;
