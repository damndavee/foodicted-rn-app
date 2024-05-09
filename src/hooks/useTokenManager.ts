import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../storage/store";
import { router } from "expo-router";
import { setUserInfoThunk } from "../storage/store/global/global.thunk";
import { selectAuthUserObject } from "../storage/store/global/global.reducer";
import { restoreToken } from "../storage/SecureStorage";

const useTokenManager = () => {
    const dispatch = useAppDispatch();
    const authUser = useAppSelector(selectAuthUserObject);

    const checkUserSession = async () => {
        const token = await restoreToken();

        if(token) {
            dispatch(setUserInfoThunk(router.replace)).then((user) => {
                console.log("AUTHENTICATED USER GOES BRRR: ", user);
            });
        } else {
            // TODO: Prompt for reauthentication
        }
    }

    useEffect(() => {
        console.log("EXP: ", new Date(1715258501000).toTimeString());        
        console.log("NOW: ", new Date(1715255339143).toTimeString());
        checkUserSession();
    }, []);
};

export default useTokenManager;