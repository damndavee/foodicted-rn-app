import React from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router';
import { StatusBar, StatusBarStyle } from "expo-status-bar";

import useImagesLoader from '../src/hooks/useImagesLoader';

import SplashScreen from '../src/components/Splash';
import { COLORS } from '../src/utils/tokens';
import { NativeBaseProvider } from 'native-base';

export const RootNavigation = () => {
    const statusBar = {
        statusBarStyle: 'dark' as StatusBarStyle,
        statusBarColor: COLORS.primaryLight
    };

    return (
        <Stack screenOptions={{ headerShown: false, ...statusBar }}>
            <Stack.Screen name='index' />
        </Stack>
    )
}

const RootLayout = () => {
    const [imagesLoaded] = useImagesLoader([
        require('../assets/splash-screen.png'),
    ])

    return (
        <SplashScreen isLoaded={imagesLoaded!}>
            <NativeBaseProvider>
                <StatusBar animated />
                <RootNavigation />
            </NativeBaseProvider>
        </SplashScreen>
    )
}

export default RootLayout;

const styles = StyleSheet.create({})