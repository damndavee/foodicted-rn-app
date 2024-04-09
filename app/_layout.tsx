import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router';
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { EXPO_WEB_CLIENT_ID } from '@env';

import useImagesLoader from '../src/hooks/useImagesLoader';

import SplashScreen from '../src/components/Splash';
import { COLORS } from '../src/utils/tokens';
import { NativeBaseProvider } from 'native-base';
import { TemplateContextProvider } from '../src/context/Template';
import { useFonts, DancingScript_400Regular, DancingScript_500Medium, DancingScript_600SemiBold, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';

WebBrowser.maybeCompleteAuthSession();

export const RootNavigation = () => {
    const statusBar = {
        statusBarStyle: 'dark' as StatusBarStyle,
        statusBarColor: COLORS.primaryLight
    };

    return (
        <Stack screenOptions={{ ...statusBar }}>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='auth' options={{ headerShown: false }} />
            <Stack.Screen name='forgotPassword' />
        </Stack>
    )
}

const RootLayout = () => {
    const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);

    const [imagesLoaded] = useImagesLoader([
        require('../assets/splash-screen.png'),
        require('../assets/welcome-screen.png'),
        require('../assets/auth-screen.png'),
    ]);

    const [isFontLoaded] = useFonts({
        DancingScript_400Regular,
        DancingScript_500Medium,
        DancingScript_600SemiBold,
        DancingScript_700Bold,
    });

    useEffect(() => { 
        GoogleSignin.configure({
            webClientId: EXPO_WEB_CLIENT_ID,
        });
    }, []);
    
    useEffect(() => {
        if (isFontLoaded && imagesLoaded!) {
            setIsAppLoaded(true);
        }
    }, [isFontLoaded, imagesLoaded]);

    return (
        <SplashScreen isLoaded={isAppLoaded}>
            <NativeBaseProvider>
                <TemplateContextProvider>
                    <StatusBar animated />
                    <RootNavigation />
                </TemplateContextProvider>
            </NativeBaseProvider>
        </SplashScreen>
    )
}

export default RootLayout;

const styles = StyleSheet.create({})