import React from 'react';
import { StyleSheet, View, ImageBackground, ImageResizeMode } from 'react-native';
import { Heading } from 'native-base';

import Button from '../src/components/buttons/Button';
import { useTemplateContext } from '../src/context/Template';
import { COLORS, SPACINGS } from '../src/utils/tokens';

import { Templates } from '../src/types/template';
import FormInput from '../src/components/form/FormInput';
import { FormInputProps } from '../src/types/components/formInput';
import { Form } from '../src/types/auth/form';
import useForm from '../src/hooks/useForm';
import { AuthIcon } from '../src/components/icon/Icon';
import FormFooter from '../src/components/form/FormFooter';

const AuthScreen = () => {
    const { template, setTemplate } = useTemplateContext();
    const { handleChange, handleSubmit, handleClearForm, userData } = useForm();

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
        handleClearForm();
        setTemplate(template.name === Templates.Signin ? Templates.Signup : Templates.Signin);
    }
    
    const renderForm = () => {
        const { fields } = template;

        // TODO: for isValid prop, validation has to be added.

        return fields.map((field: FormInputProps) => {
            return (
                <FormInput
                    value={userData[field.id as keyof Form]}
                    errorMessage="This is Error placeholder message just to check potential length of the error message container" 
                    key={field.id} 
                    id={field.id} 
                    isValid 
                    onChange={handleChange} 
                    placeholder={field.placeholder} 
                    type={field.type} 
                    variant={field.variant} 
                    icon={field.icon} 
                />
            )
        })
    }
    
    return (
        <View style={[styles.rootContainer]}>
            <ImageBackground {...imageProps} >
                <View style={styles.innerContainer}>
                    <View style={{gap: SPACINGS.medium}}>
                        <Heading style={styles.header} size="2xl">{template.header}</Heading>
                        <AuthIcon style={styles.icon} />
                        <View style={styles.formContainer}> 
                            {renderForm()}
                            <FormFooter templateName={template.name} />
                        </View>
                    </View>
                    <View>
                        <Button 
                            fullWidth 
                            label={template.ctaText} 
                            onPress={handleSubmit} 
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
        height: '95%',
        padding: SPACINGS.large,
        justifyContent: 'space-between'
    },
    formContainer: {
        width: '100%',
        gap: SPACINGS.xlarge + 5,
    },
    header: {
        alignSelf: "center", 
        color: COLORS.tertiaryLight,
    },
    icon: {
        alignSelf: 'center', 
        width: 200, 
        height: 200
    }
})