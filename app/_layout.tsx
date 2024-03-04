import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router';
import { StatusBar, StatusBarStyle } from "expo-status-bar";

import useImagesLoader from '../src/hooks/useImagesLoader';

import SplashScreen from '../src/components/Splash';
import { COLORS } from '../src/utils/tokens';
import { NativeBaseProvider } from 'native-base';
import { TemplateContextProvider } from '../src/context/Template';
import { useFonts, DancingScript_400Regular, DancingScript_500Medium, DancingScript_600SemiBold, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';

export const RootNavigation = () => {
    const statusBar = {
        statusBarStyle: 'dark' as StatusBarStyle,
        statusBarColor: COLORS.primaryLight
    };

    return (
        <Stack screenOptions={{ headerShown: false, ...statusBar }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='auth' />
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

    // ! NOT WORKING FOR NOW ~ PROBABLY NEED TO WAIT FOR MORE STABLE VERSION OF SDK50
    const [isFontLoaded] = useFonts({
        DancingScript_400Regular,
        DancingScript_500Medium,
        DancingScript_600SemiBold,
        DancingScript_700Bold,
    });

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