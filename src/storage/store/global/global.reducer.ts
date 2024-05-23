import { createAppSlice } from "../utils";
import { PayloadAction, SerializedError, isFulfilled  } from "@reduxjs/toolkit";
import { UserWithOnboardingFlags } from './global.type';
import { fulfilledThunkKeys } from '../../constants';

export type GlobalSliceState = {
    token: string;
    authUserObject: UserWithOnboardingFlags | null,
    isSpinnerVisible: boolean;
    loadingMsg: string | null;
    error: any;
};

type SliceSelectors = {
    selectLoadingState: (state: GlobalSliceState) => { isSpinnerVisible: boolean, loadingMsg: string };
    selectToken: (state: GlobalSliceState) => string;
    selectAuthUserObject: (state: GlobalSliceState) =>  UserWithOnboardingFlags;
}

const slice = createAppSlice({
    name: 'globalReducer',
    initialState: {
        token: '',
        authUserObject: null,
        isSpinnerVisible: false,
        loadingMsg: null,
        error: null,
    } as GlobalSliceState,
    reducers: (create) => ({
        toggleSpinnerVisibility: create.reducer<boolean>((state, action) => {
            state.isSpinnerVisible = action.payload;
        }),
        setToken: create.reducer<string>((state, action) => {
            state.token = action.payload;
        })
    }),
    extraReducers: builder => {
        builder.addMatcher(
            (action) =>isFulfilled(action) && fulfilledThunkKeys.includes(action.type),
            (state, action: PayloadAction<UserWithOnboardingFlags>) => {
                state.isSpinnerVisible = false;
                state.authUserObject = action.payload;
            }
        ),
        builder.addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action: PayloadAction<unknown, string, {}, SerializedError>) => {
                state.isSpinnerVisible = false;
                state.error = action.error;
            }
        )
    },
    selectors: {
        selectLoadingState: ({ isSpinnerVisible, loadingMsg }) => ({isSpinnerVisible, loadingMsg}),
        selectToken: ({ token }) => token,
        selectAuthUserObject: ({ authUserObject }) => authUserObject,
    } as SliceSelectors,
});

export const { toggleSpinnerVisibility, setToken } = slice.actions;
export const { selectLoadingState, selectToken, selectAuthUserObject } = slice.selectors;
export default slice.reducer;