import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleSpinnerVisibility } from "./global.reducer";
import { authStateChangeListener } from "../../../services/firebase";

export const setUserInfoThunk = createAsyncThunk('global/set_user_info', async (routerReplaceCallback: (path: string) => void, { dispatch }) => {
    dispatch(toggleSpinnerVisibility(true));

    return authStateChangeListener().then((user) => {
        if(user) {
            routerReplaceCallback('/onboarding');
            return user;
        }
    }).finally(() => {
        dispatch(toggleSpinnerVisibility(false));
    })
})