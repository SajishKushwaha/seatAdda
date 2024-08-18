import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { busDetailsReducer } from "./BookBus/reducer";
import { updateFilterDetailsReducer } from "./FilterAndSort/reducer";
import {authReducer} from "./auth/reducer";

const rootReducer = combineReducers({busDetailsReducer,updateFilterDetailsReducer,authReducer });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
