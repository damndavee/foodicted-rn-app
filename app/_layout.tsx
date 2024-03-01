import React from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router';
import { StatusBar, StatusBarStyle } from "expo-status-bar";

import useImagesLoader from '../src/hooks/useImagesLoader';

import SplashScreen from '../src/components/Splash';

export const RootNavigation = () => {
    const statusBar = {
        statusBarStyle: 'dark' as StatusBarStyle,
        statusBarColor: '#FAE6CD'
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
            <StatusBar animated />
            <RootNavigation />
        </SplashScreen>
    )
}

export default RootLayout;

const styles = StyleSheet.create({})