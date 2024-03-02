import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Heading } from "native-base";

import { COLORS, FONT_SIZES, SPACINGS } from '../src/utils/tokens';
import Button from '../src/components/buttons/Button';
import { useTemplateContext } from '../src/context/Template';
import { Templates } from '../src/types/template';

const WelcomeScreen = () => {
    const templateContext = useTemplateContext();

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
                        onPress={() => templateContext.navigateWithTemplate({template: Templates.Signin, pathname: '/auth'})} 
                        size='Medium' 
                        type='Tertiary' 
                        variant='Filled' 
                        label='Sign In' 
                    />
                    <Button 
                        fullWidth 
                        onPress={() => templateContext.navigateWithTemplate({template: Templates.Signup, pathname: '/auth'})} 
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
    },
    icon: {
        width: 290,
        height: 290,
        alignSelf: 'center'
    }
})