import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Heading, Text } from "native-base";

import { COLORS, FONT_SIZES, SPACINGS } from '../src/utils/tokens';
import AuthButtons from '../src/components/form/AuthButtons';

const WelcomeScreen = () => {
    return (
        <ImageBackground source={require('../assets/welcome-screen.png')} resizeMode='cover' style={styles.rootContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.descriptionContainer}>
                    <View style={styles.headingContainer}>
                        <Heading style={styles.heading} size="2xl" >Fooddicted</Heading>
                    </View>
                    <View style={styles.description}>
                        <Text style={[styles.descriptionHeader, {color: COLORS.secondaryLight}]}>Get Your cooking</Text>
                        <Text style={[styles.descriptionText, {color: COLORS.secondaryLight}]}>easier than it used to!</Text>
                    </View>
                </View>
                <View style={{ gap: SPACINGS.small }}>
                    <AuthButtons />
                    <View style={styles.tncContainer}>
                        <Text color={COLORS.text} textAlign="center">By continuing You agree to the <Text bold>terms of use</Text> and <Text bold>privacy policy</Text></Text>
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
        padding: SPACINGS.xlarge,
        justifyContent: 'space-between'
    },
    descriptionContainer: {
        width: "100%",
    },
    headingContainer: {
        elevation: 2,
    },
    heading: {
        fontFamily: 'DancingScript_600SemiBold',
        color: COLORS.secondary
    },
    description: {
        marginTop: SPACINGS.small,
        width: '70%',
    },
    descriptionHeader: {
        paddingTop: SPACINGS.xsmall,
        fontWeight: 'bold',
        fontSize: FONT_SIZES.big
    },
    descriptionText: {
        fontSize: FONT_SIZES.big,
        fontWeight: 'bold',
    },
    tncContainer: {
        marginTop: SPACINGS.xlarge,
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})