import { User } from 'firebase/auth';
import { createAppSlice } from "../utils";
import { authStateChangeListener } from '../../../services/firebase';
import { setUserInfoThunk } from './global.thunk';

type SliceState = {
    token: string;
    authUserObject: User | null;
    isSpinnerVisible: boolean;
    loadingMsg: string | null;
    error: any;
};

type SliceSelectors = {
    selectLoadingState: (state: SliceState) => { isSpinnerVisible: boolean, loadingMsg: string };
    selectToken: (state: SliceState) => string;
    selectAuthUserObject: (state: SliceState) => User
}

const slice = createAppSlice({
    name: 'globalReducer',
    initialState: {
        token: '',
        authUserObject: null,
        isSpinnerVisible: false,
        loadingMsg: null,
        error: null,
    } as SliceState,
    reducers: (create) => ({
        toggleSpinnerVisibility: create.reducer<boolean>((state, action) => {
            state.isSpinnerVisible = action.payload;
        }),
        setToken: create.reducer<string>((state, action) => {
            state.token = action.payload;
        })
    }),
    extraReducers: builder => {
        builder.addCase(setUserInfoThunk.fulfilled, (state: SliceState, action) => {
            if(action.payload) {
                state.authUserObject = action.payload;
            }
        });
        builder.addCase(setUserInfoThunk.rejected, (state: SliceState, action) => {
            state.error = action.error;
        })
    },
    selectors: {
        selectLoadingState: ({ isSpinnerVisible, loadingMsg }) => ({isSpinnerVisible, loadingMsg}),
        selectToken: ({ token }) => token,
        selectAuthUserObject: ({ authUserObject }) => authUserObject
    } as SliceSelectors,
});

export const { toggleSpinnerVisibility, setToken } = slice.actions;
export const { selectLoadingState, selectToken, selectAuthUserObject } = slice.selectors;
export default slice.reducer;