import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { restoreToken } from "../storage/SecureStorage";
import { authStateChangeListener } from "../services/firebase";
import { router } from "expo-router";

interface WideAppContextType {
    token: string;
    user: any;
    updateToken: (arg0: string) => void;
    updateUser: (arg0: any) => void;
};

export const WideAppContext = createContext<WideAppContextType | null>(null);

export const WideAppContextProvider = (props: PropsWithChildren) => {
    useEffect(() => {
        const restoreAccessToken = async () => {
            const token = await restoreToken();
            
            if(!token) return;

            setToken(token);
        }

        authStateChangeListener((user: any) => {            
            if(user) {
                setUserInfo(user);
                router.replace('/onboarding');
            }
        });
    
        restoreAccessToken();
    }, []);

    const [token, setToken] = useState<string>('');
    const [userInfo, setUserInfo] = useState<any>(null);

    const updateToken = (token: string) => setToken(token);
    
    const updateUser = (user: any) => setUserInfo(user);

    return (
        <WideAppContext.Provider value={{ 
            token, 
            user: userInfo, 
            updateToken,
            updateUser
        }}>
            {props.children}
        </WideAppContext.Provider>
    )
};

export const useWideAppContext = () => {
    const context = useContext(WideAppContext);

    if(!context) {
        throw new Error('useWideAppContext must be used within a WideAppContextProvider');
    }

    return context;
}