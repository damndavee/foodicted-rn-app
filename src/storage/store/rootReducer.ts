import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./global/global.reducer";

const rootReducer = combineReducers({
    globalReducer,
});

export default rootReducer;