import { useEffect } from "react";
import { Stack } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as WebBrowser from "expo-web-browser";
import useImagesLoader from '../src/hooks/useImagesLoader';
import tokens from '../src/utils/tokens';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { TemplateContextProvider } from '../src/context/Template';
import { 
    useFonts as useGoogleFonts, 
    Poppins_100Thin, 
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight, 
    Poppins_200ExtraLight_Italic,
    Poppins_300Light, 
    Poppins_300Light_Italic, 
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic, 
    Poppins_600SemiBold, 
    Poppins_600SemiBold_Italic, 
    Poppins_700Bold, 
    Poppins_700Bold_Italic, 
    Poppins_800ExtraBold, 
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic, 
} from '@expo-google-fonts/poppins'

import { AmaticaSC_Bold700, AmaticaSC_Regular400 } from '@expo-google-fonts/amatica-sc'

import { WideAppContextProvider } from "../src/context/App";
import useAuthProviders from "../src/hooks/useAuthProviders";
import { theme } from "../src/theme";

WebBrowser.maybeCompleteAuthSession();
ExpoSplashScreen.preventAutoHideAsync();

export const RootNavigation = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='auth' options={{ headerShown: false }} />
            <Stack.Screen name='forgotPassword' />
            <Stack.Screen name='onboarding' />
        </Stack>
    )
}

const RootLayout = () => {
    const { AppleAuthentication, GoogleAuthentication, FacebookAuthentication } = useAuthProviders();

    const [imagesLoaded] = useImagesLoader([
        require('../assets/splash-screen.png'),
        require('../assets/welcome-screen.png'),
        require('../assets/auth-screen.png'),
    ]);

    const [isGoogleFontLoaded, googleFontError] = useGoogleFonts({
        Poppins100: Poppins_100Thin,
        Popping100Italic: Poppins_100Thin_Italic,
        Poppins200: Poppins_200ExtraLight,
        Popping200Italic: Poppins_200ExtraLight_Italic,
        Poppins300: Poppins_300Light,
        Popping300Italic: Poppins_300Light_Italic,
        Poppins400: Poppins_400Regular,
        Popping400Italic: Poppins_400Regular_Italic,
        Poppins500: Poppins_500Medium,
        Popping500Italic: Poppins_500Medium_Italic,
        Poppins600: Poppins_600SemiBold,
        Popping600Italic: Poppins_600SemiBold_Italic,
        Poppins700: Poppins_700Bold,
        Popping700Italic: Poppins_700Bold_Italic,
        Poppins800: Poppins_800ExtraBold,
        Popping800Italic: Poppins_800ExtraBold_Italic,
        Poppins900: Poppins_900Black,
        Popping900Italic: Poppins_900Black_Italic,
        Amatica400: AmaticaSC_Regular400,
        Amatica700: AmaticaSC_Bold700,
        ...FontAwesome.font
    })
    
    useEffect(() => { 
        GoogleAuthentication.init();
        AppleAuthentication.init(); 
        FacebookAuthentication.init();
    }, []);

    useEffect(() => {
        if (isGoogleFontLoaded && imagesLoaded) {
            ExpoSplashScreen.hideAsync();
        }
    }, [isGoogleFontLoaded]);
    
    if (!isGoogleFontLoaded && !imagesLoaded) {
        return null;
    }

    return (
        <NativeBaseProvider theme={theme}>
            <WideAppContextProvider>
                <TemplateContextProvider>
                    <StatusBar animated translucent={false} barStyle='dark-content' backgroundColor={tokens.color.primary.light} />
                    <RootNavigation />
                </TemplateContextProvider>
            </WideAppContextProvider>
        </NativeBaseProvider>
    )
}

export default RootLayout;