import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Heading, Text } from "native-base";

import { COLORS, FONT_SIZES, SPACINGS } from '../src/utils/tokens';
import Button from '../src/components/buttons/Button';
import { useTemplateContext } from '../src/context/Template';
import { Templates } from '../src/types/template';
import IconButton from '../src/components/buttons/IconButton';

const WelcomeScreen = () => {
    const templateContext = useTemplateContext();

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
                    <View style={styles.socialsContainer}>
                        <Button  
                            onPress={() => {}}
                            size='Medium' 
                            type='Tertiary' 
                            leftIcon='logo-google'
                            variant='Filled' 
                            label='Google'
                            flex={1}
                        />
                        <Button 
                            onPress={() => {}}
                            size='Medium' 
                            type='Tertiary'
                            leftIcon='logo-facebook'
                            variant='Filled' 
                            label='Facebook'
                            flex={1}
                        />
                    </View>
                        <Button 
                            fullWidth 
                            leftIcon='mail-sharp'
                            onPress={() => templateContext.navigateWithTemplate({template: Templates.Signin, pathname: '/auth'})} 
                            size='Medium' 
                            type='Tertiary' 
                            variant='Filled' 
                            label='Sign In with email' 
                        />
                        <Button  
                            onPress={() => templateContext.navigateWithTemplate({template: Templates.Signup, pathname: '/auth'})} 
                            size='Medium' 
                            type='Secondary' 
                            variant='Ghost' 
                            label="Create a new account"
                            selfAlignment='center'
                        />
                    
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
    socialsContainer: {
        gap: SPACINGS.big, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center' 
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