import { useEffect, useState } from "react";
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as WebBrowser from "expo-web-browser";
import useImagesLoader from '../src/hooks/useImagesLoader';
import SplashScreen from '../src/components/Splash';
import tokens from '../src/utils/tokens';
import { NativeBaseProvider } from 'native-base';
import { TemplateContextProvider } from '../src/context/Template';

import { WideAppContextProvider } from "../src/context/App";
import useAuthProviders from "../src/hooks/useAuthProviders";
import { theme } from "../src/theme";

WebBrowser.maybeCompleteAuthSession();

export const RootNavigation = () => {
    const statusBar = {
        statusBarStyle: 'dark' as StatusBarStyle,
        statusBarColor: tokens.color.primary.light
    };

    return (
        <Stack screenOptions={{ ...statusBar }}>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='auth' options={{ headerShown: false }} />
            <Stack.Screen name='forgotPassword' />
            <Stack.Screen name='onboarding' />
        </Stack>
    )
}

const RootLayout = () => {
    const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);

    const { AppleAuthentication, GoogleAuthentication, FacebookAuthentication } = useAuthProviders();

    const [imagesLoaded] = useImagesLoader([
        require('../assets/splash-screen.png'),
        require('../assets/welcome-screen.png'),
        require('../assets/auth-screen.png'),
    ]);

    const [isFontLoaded, fontError] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        AmaticSCRegular: require('../assets/fonts/AmaticSC-Bold.ttf'),
        AmaticSCBold: require('../assets/fonts/AmaticSC-Regular.ttf'),
        LatoBlack: require('../assets/fonts/Lato-Black.ttf'),
        LatoBlackItalic: require('../assets/fonts/Lato-BlackItalic.ttf'),
        LatoBold: require('../assets/fonts/Lato-Bold.ttf'),
        LatoBoldItalic: require('../assets/fonts/Lato-BoldItalic.ttf'),
        LatoItalic: require('../assets/fonts/Lato-Italic.ttf'),
        LatoLight: require('../assets/fonts/Lato-Light.ttf'),
        LatoLightItalic: require('../assets/fonts/Lato-LightItalic.ttf'),
        LatoRegular: require('../assets/fonts/Lato-Regular.ttf'),
        LatoThin: require('../assets/fonts/Lato-Thin.ttf'),
        LatoThinItalic: require('../assets/fonts/Lato-ThinItalic.ttf'),
        ...FontAwesome.font
    }); 
    
    useEffect(() => { 
        GoogleAuthentication.init();
        AppleAuthentication.init(); 
        FacebookAuthentication.init();
    }, []);

    useEffect(() => {
        if (isFontLoaded && imagesLoaded) {
            setIsAppLoaded(true);
        }
    }, [isFontLoaded]);
    
    if (!isFontLoaded && !imagesLoaded) {
        return null;
    }

    return (
        <SplashScreen isLoaded={isAppLoaded}>
            <NativeBaseProvider theme={theme}>
                <WideAppContextProvider>
                    <TemplateContextProvider>
                        <StatusBar animated />
                        <RootNavigation />
                    </TemplateContextProvider>
                </WideAppContextProvider>
            </NativeBaseProvider>
        </SplashScreen>
    )
}

export default RootLayout;