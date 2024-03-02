import React from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router';
import { StatusBar, StatusBarStyle } from "expo-status-bar";

import useImagesLoader from '../src/hooks/useImagesLoader';

import SplashScreen from '../src/components/Splash';
import { COLORS } from '../src/utils/tokens';
import { NativeBaseProvider } from 'native-base';
import { TemplateContextProvider } from '../src/context/Template';

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
    const [imagesLoaded] = useImagesLoader([
        require('../assets/splash-screen.png'),
        require('../assets/welcome-screen.png'),
        require('../assets/auth-screen.png'),
    ])

    return (
        <SplashScreen isLoaded={imagesLoaded!}>
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