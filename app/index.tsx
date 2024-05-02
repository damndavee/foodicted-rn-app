import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Heading, Text } from "native-base";

import tokens from '../src/utils/tokens';
import AuthButtons from '../src/components/form/AuthButtons';

const WelcomeScreen = () => {
    return (
        <ImageBackground source={require('../assets/welcome-screen.png')} resizeMode='cover' style={styles.rootContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.descriptionContainer}> 
                    <View style={styles.headingContainer}>
                        <Heading 
                            fontFamily='heading' 
                            fontWeight={900}
                            bold
                            style={styles.heading} 
                            size="4xl"
                        >
                            Fooddicted
                        </Heading>
                    </View>
                    <View style={styles.description}>
                        <Text fontWeight={400} style={[styles.descriptionHeader, {color: tokens.color.secondary.light }]}>Get Your cooking</Text>
                        <Text fontWeight={400} style={[styles.descriptionText, {color: tokens.color.secondary.light }]}>easier than it used to!</Text>
                    </View>
                </View>
                <View style={{ gap: tokens.spacing.small }}>
                    <AuthButtons />
                    <View style={styles.tncContainer}>
                        <Text color={tokens.color.text} textAlign="center">By continuing You agree to the <Text bold>terms of use</Text> and <Text bold>privacy policy</Text></Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    innerContainer: {
        height: '80%',
        padding: tokens.spacing.xlarge,
        justifyContent: 'space-between'
    },
    descriptionContainer: {
        width: "100%",
    },
    headingContainer: {
        elevation: 2,
    },
    heading: {
        color: tokens.color.secondary.default,
    },
    description: {
        marginTop: tokens.spacing.small,
        width: '70%',
    },
    descriptionHeader: {
        paddingTop: tokens.spacing.xsmall,
        fontSize: tokens.fontSize.large
    },
    descriptionText: {
        fontSize: tokens.fontSize.large,
    },
    tncContainer: {
        marginTop: tokens.spacing.xlarge,
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})