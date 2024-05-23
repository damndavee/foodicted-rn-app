import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleSpinnerVisibility } from "./global.reducer";
import { 
    authStateChangeListener,
    creasteUserWithAdditionalData,
    generateFacebookSignInCredentials, 
    generateGoogleSignInCredentials, 
    getUserSnapshot, 
    signInWithEmail, 
    signInWithExternalCredentials, 
    signUpWithEmail, 
    reauthenticateUser
} from "../../../services/firebase";
import { AuthCredential, User, UserCredential } from "firebase/auth";
import { AppProviders, AuthUser, CustomProviderAuthArguments, UserWithOnboardingFlags } from "./global.type";
import { saveToken } from "../../SecureStorage";
import { Templates } from "../../../types/template";
import { router } from "expo-router";


export const checkActiveUserSessionThunk = createAsyncThunk(
    'global/check_active_user_session',
    async () => {
        const user = await authStateChangeListener();

        if(!user) return null;

        const userDBData = await getUserSnapshot(user.uid) as unknown as UserWithOnboardingFlags;

        return userDBData;
    }
);

export const authenticateUserDefault = createAsyncThunk('global/authenticate_user_default', async (args: {email: string, password: string, template: keyof typeof Templates}, { dispatch }) => {
    let user: UserCredential | null;
    dispatch(toggleSpinnerVisibility(true));

    if(args.template === Templates.Signin) {
        user = await signInWithEmail(args.email, args.password);
    } else {
        user = await signUpWithEmail(args.email, args.password);
    }

    dispatch(retrieveAuthBasedUserDocumentThunk(user.user));
})

export const authenticateWithCustomProviderThunk = createAsyncThunk(
    'global/authenticate_with_custom_provider', 
    async (args: CustomProviderAuthArguments, { dispatch }) => {

    dispatch(toggleSpinnerVisibility(true));

    const authAppProviders: Record<keyof typeof AppProviders, () => AuthCredential | null> = {
        [AppProviders.APPLE]: () => null,
        [AppProviders.FACEBOOK]: () => generateFacebookSignInCredentials(args.uid),
        [AppProviders.GOOGLE]: () => generateGoogleSignInCredentials(args.uid),
    }

    const authCredentials = authAppProviders[AppProviders[args.provider]]();

    // TODO: perform some error alert.
    if(!authCredentials) return;
    
    const { user } = await signInWithExternalCredentials(authCredentials);

    dispatch(toggleSpinnerVisibility(false));
    dispatch(retrieveAuthBasedUserDocumentThunk(user));
    
    return user;
});

export const retrieveAuthBasedUserDocumentThunk = createAsyncThunk(
    'global/retrieve_auth_based_user_document',
    async ( user: User, { dispatch } ) => {
        let userDoc: UserWithOnboardingFlags | null; 

        const authUser: AuthUser = {
            avatarUrl: user.photoURL,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            nickname: null,
        };

        userDoc = await getUserSnapshot(user.uid) as unknown as UserWithOnboardingFlags;

        if(!userDoc) {
            userDoc = await creasteUserWithAdditionalData(user.uid, authUser);
        }

        const userToken = (await user.getIdTokenResult()).token;
        saveToken(userToken);

        router.replace('/onboarding');
        dispatch(toggleSpinnerVisibility(false));
        return userDoc;
    }
);

export const updateUserAccessToken = createAsyncThunk('global/update_user_access_token', async () => {
    const reauthenticatedUserToken = await reauthenticateUser();

    if(reauthenticatedUserToken) {
        saveToken(reauthenticatedUserToken);
    }
});