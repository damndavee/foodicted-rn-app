import React from 'react';
import { StyleSheet, View, ImageBackground, ImageResizeMode } from 'react-native';
import { Heading } from 'native-base';

import Button from '../src/components/buttons/Button';
import { useTemplateContext } from '../src/context/Template';
import { COLORS, SPACINGS } from '../src/utils/tokens';

import { Templates } from '../src/types/template';

const AuthScreen = () => {
    const { template, setTemplate } = useTemplateContext();

    // TODO: Loading spinner
    if(!template) {
        return;
    }

    const imageProps = {
        style: [styles.imgBackground],
        source: require('../assets/auth-screen.png'),
        resizeMode: 'cover' as ImageResizeMode
    }

    const switchAuthFormType = () => {
        setTemplate(template.name === Templates.Signin ? Templates.Signup : Templates.Signin);
    }
    
    return (
        <View style={[styles.rootContainer]}>
            <ImageBackground {...imageProps} >
                <View style={styles.innerContainer}>
                    <Heading pl={5} size='2xl' color={COLORS.primary} maxWidth='2/3'>{template.header}</Heading>
                    <View style={styles.formContainer}>
                        {/* //TODO: Form goes here */}
                    </View>
                    <View>
                        <Button 
                            fullWidth 
                            label={template.ctaText} 
                            onPress={() => {}} 
                            size='Medium' 
                            type='Secondary' 
                            variant='Filled' 
                        />
                        <Button 
                            label={template.link} 
                            onPress={switchAuthFormType}
                            size='Medium' 
                            type='Primary' 
                            variant='Ghost'
                            selfAlignment='center'
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    ) 
}

export default AuthScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    imgBackground: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    },
    innerContainer: {
        height: '90%',
        padding: SPACINGS.large,
        justifyContent: 'space-between'
    },
    formContainer: {
        width: '100%',
        gap: SPACINGS.xlarge + 5,
    },
})