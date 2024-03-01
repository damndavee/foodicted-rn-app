import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Heading } from "native-base";

import { COLORS, FONT_SIZES, SPACINGS } from '../src/utils/tokens';
import Button from '../src/components/buttons/Button';

const WelcomeScreen = () => {

    return (
        <ImageBackground source={require('../assets/welcome-screen.png')} resizeMode='cover' style={styles.rootContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.descriptionContainer}>
                    <View style={styles.headingContainer}>
                        <Heading size="2xl" color={COLORS.secondary} >Fooddicted</Heading>
                    </View>
                    <View style={styles.description}>
                        <Text style={[styles.descriptionHeader, {color: COLORS.secondaryLight}]}>Get Your cooking</Text>
                        <Text style={[styles.descriptionText, {color: COLORS.secondaryLight}]}>easier than it used to!</Text>
                    </View>
                </View>
                <View style={{ gap: SPACINGS.big }}>
                    <Button 
                        fullWidth 
                        onPress={() => {}} 
                        size='Medium' 
                        type='Tertiary' 
                        variant='Filled' 
                        label='Sign In' 
                    />
                    <Button 
                        fullWidth 
                        onPress={() => {}}
                        size='Medium' 
                        type='Secondary' 
                        variant='Outline' 
                        label='Get started' 
                    />
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
        height: '75%',
        padding: SPACINGS.xlarge,
        justifyContent: 'space-between'
    },
    descriptionContainer: {
        width: "100%",
    },
    headingContainer: {
        elevation: 2,
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
})