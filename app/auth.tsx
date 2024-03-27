import React from 'react';
import { StyleSheet, View, ImageBackground, ImageResizeMode, TextInput } from 'react-native';
import { Heading, Text } from 'native-base';

import Button from '../src/components/buttons/Button';
import { useTemplateContext } from '../src/context/Template';
import { COLORS, SPACINGS } from '../src/utils/tokens';

import { Templates } from '../src/types/template';
import FormInput from '../src/components/form/FormInput';
import { FormInputProps } from '../src/types/components/formInput';
import { AuthIcon } from '../src/components/icon/Icon';
import FormFooter from '../src/components/form/FormFooter';
import { Formik } from 'formik';


const AuthScreen = () => {
    const { template, setTemplate, validationSchema } = useTemplateContext();

    // TODO: Loading spinner
    if(!template) {
        return;
    }

    const imageProps = {
        style: [styles.imgBackground],
        source: require('../assets/auth-screen.png'),
        resizeMode: 'cover' as ImageResizeMode
    }

    const handleSwitchAuthFormType = () => {
        const temp = template.name === Templates.Signin ? Templates.Signup : Templates.Signin;
        setTemplate(temp);
    }
        console.log(validationSchema);
    return (
        <View style={[styles.rootContainer]}>
            <ImageBackground {...imageProps} >
                <View style={styles.innerContainer}>
                    <View>
                        <Heading style={styles.header} size="2xl">{template.header}</Heading>
                        <AuthIcon style={styles.icon} />
                    </View>
                    
                    <Formik initialValues={template.state} validationSchema={validationSchema} onSubmit={values => console.log("VALUES", values)}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, handleReset }) => (
                            <View style={styles.formInnerContainer}>
                                <View style={styles.inputsContainer}>
                                    {template.fields.map((field: FormInputProps) => {
                                        const isFieldValid = touched[field.id] && errors[field.id];

                                        return (
                                            <FormInput
                                                value={values[field.id]}
                                                errorMessage={errors[field.id]} 
                                                key={field.id} 
                                                id={field.id} 
                                                isValid={!isFieldValid}
                                                onBlur={handleBlur(field.id)}
                                                onChange={handleChange(field.id)} 
                                                placeholder={field.placeholder} 
                                                type={field.type} 
                                                variant={field.variant} 
                                                icon={field.icon} 
                                            />
                                        )
                                    })}                            
                                    <FormFooter templateName={template.name} />
                                </View>

                                
                                <View style={styles.actionContainer}>
                                    <Button 
                                        fullWidth 
                                        label={template.ctaText} 
                                        onPress={handleSubmit} 
                                        size='Medium' 
                                        type='Primary' 
                                        variant='Filled' 
                                    />
                                    <Button 
                                        label={template.link} 
                                        onPress={() => {
                                            handleReset();
                                            handleSwitchAuthFormType();
                                        }}
                                        size='Medium' 
                                        type='Primary' 
                                        variant='Ghost'
                                        selfAlignment='center'
                                    />
                                </View> 
                            </View>
                        )}
                    </Formik>
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
        gap: SPACINGS.large + 10,
        justifyContent: 'space-between',
    },
    formInnerContainer: {
        justifyContent: 'space-between',
        flex: 1
    },
    inputsContainer: {
        gap: SPACINGS.large
    },
    actionContainer: {

    },
    header: {
        alignSelf: "center", 
        color: COLORS.tertiaryLight,
    },
    icon: {
        alignSelf: 'center', 
        width: 170, 
        height: 170
    }
})