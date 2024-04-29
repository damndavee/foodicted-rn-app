import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import useAuthProviders from '../../src/hooks/useAuthProviders'

const OnboardingScreen = () => {
    const { GoogleAuthentication, FacebookAuthentication} = useAuthProviders();

    return (
        <View>
            <Text>Here is an authenticated user!@#!@#!</Text>
            <Button onPress={GoogleAuthentication.logout}>Log out</Button>
        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({})