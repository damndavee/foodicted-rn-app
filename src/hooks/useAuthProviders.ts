import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from "react";

const useAuthProviders = () => {
    const googleSignInHandler = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();

            console.log("USER: ", user);
        } catch(e) {
            console.log("ERROR: ", e);
        }
    };

    const googleLogout = () => {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    };

    const Google = {
        signIn: googleSignInHandler,
        logout: googleLogout,
    };

    return { Google };
};

export default useAuthProviders;