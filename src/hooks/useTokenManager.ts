import { useEffect } from "react";
import { useAppDispatch } from "../storage/store";
import { router } from "expo-router";
import { checkActiveUserSessionThunk } from "../storage/store/global/global.thunk";
import { removeTokens, restoreToken, saveToken } from "../storage/SecureStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rememberMeKey } from "../storage/constants";
import { reauthenticateUser } from "../services/firebase";

const useTokenManager = () => {
    const dispatch = useAppDispatch();

    const checkUserSession = async () => {
        // TODO: when authentication thunk is ready, move this code to thunks.
        const token = await restoreToken();
        const isRememberMeSet = await AsyncStorage.getItem(rememberMeKey);

        if(token) {
            dispatch(checkActiveUserSessionThunk());
            // TODO: change it when happy auth path is completed (change to dashboard).
            // TODO: check if onboarding in enabled?
            router.replace('/onboarding');
            return;
        }

        if(!isRememberMeSet || !JSON.parse(isRememberMeSet)) {
            // TODO: Prevently call signOut here
            removeTokens();
            return;
        }

        const refreshedToken = await reauthenticateUser();

        if(refreshedToken) {
            saveToken(refreshedToken);
        };
    }

    useEffect(() => {
        //* helpers - to debug token expiration date.

        console.log("EXP: ", new Date(1715610950000).toTimeString());        
        console.log("NOW: ", new Date(1715608966226).toTimeString());

        checkUserSession();
    }, []);
};

export default useTokenManager;