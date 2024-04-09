import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, ImageResizeMode } from 'react-native';
import { Heading } from 'native-base';

import Button from '../src/components/buttons/Button';
import { useTemplateContext } from '../src/context/Template';
import { COLORS, FONT_SIZES, SPACINGS } from '../src/utils/tokens';

import { Templates } from '../src/types/template';
import FormInput from '../src/components/form/FormInput';
import { FormInputProps } from '../src/types/components/formInput';
import { Formik } from 'formik';
import { AuthIlustration } from '../src/components/utils/Ilustration';
import { router } from 'expo-router';
import CheckboxButton from '../src/components/buttons/CheckboxButton';
import { CheckboxProps } from '../src/types/components/checkboxButton';

const AuthScreen = () => {
    const { template, setTemplate, validationSchema } = useTemplateContext();
    const [isChecked, setIsChecked] = useState<boolean>(false);

    // TODO: Loading spinner
    if(!template) {
        return;
    }

    const imageProps = {
        style: [styles.imgBackground],
        source: require('../assets/auth-screen.png'),
        resizeMode: 'cover' as ImageResizeMode
    }

    const checkboxCopies: Record<Templates, Pick<CheckboxProps, 'customAction' | 'label' | 'value'>> = {
        [Templates.Signin]: {
            label: 'Remember me',
            value: 'rememberUser',
        },
        [Templates.Signup]: {
            label: 'I agree to the',
            value: 'termsAndConditions',
            customAction: {
                // TODO: Implement custom action for T&C
                action: () => {},
                label: 'terms & conditions'
            }
        }
    }

    const handleSwitchAuthFormType = (resetCallback: () => void) => {
        const temp = template.name === Templates.Signin ? Templates.Signup : Templates.Signin;
        setTemplate(temp);
        resetCallback();
    };

    const handleOnCheck = () => {
        setIsChecked(prevState => !prevState);
    };

    const handleGoToForgotPasswordScreen = () => {
        router.navigate('/forgot-password');
    };

    return (
        <View style={[styles.rootContainer]}>
            <ImageBackground {...imageProps} >
                <View style={styles.innerContainer}>
                    <View>
                        <Heading style={styles.header} size="2xl">{template.header}</Heading>
                        <AuthIlustration style={styles.icon} />
                    </View>
                    <Formik initialValues={template.state} validationSchema={validationSchema} onSubmit={values => console.log("VALUES", values)}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, handleReset }) => (
                            <View style={styles.formInnerContainer}>
                                <View style={{gap: SPACINGS.large}}>
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
                                    <View style={styles.fomFooterContainer}>
                                        <CheckboxButton 
                                            isChecked={isChecked} 
                                            onCheck={handleOnCheck} 
                                            {...checkboxCopies[template.name]}
                                        />
                                        {template.name === Templates.Signin && (
                                            <Button 
                                                label='Forgot password?' 
                                                onPress={handleGoToForgotPasswordScreen} 
                                                size='Medium' 
                                                type='Tertiary' 
                                                variant='Ghost' 
                                                dense 
                                                textStyle={{
                                                    fontSize: FONT_SIZES.medium,
                                                    isBold: true,
                                                }} 
                                            />
                                        )}
                                    </View>
                                    <Button 
                                        fullWidth 
                                        label={template.ctaText} 
                                        onPress={handleSubmit} 
                                        size='Medium' 
                                        type='Secondary'
                                        variant='Filled' 
                                    />
                                </View>
                                <Button 
                                    label={template.link} 
                                    onPress={() => {
                                        handleSwitchAuthFormType(handleReset);
                                    }}
                                    size='Medium' 
                                    type='Primary' 
                                    variant='Ghost'
                                    selfAlignment='center'
                                    dense
                                />
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
    fomFooterContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    header: {
        alignSelf: "center", 
        color: COLORS.tertiaryLight,
    },
    icon: {
        alignSelf: 'center', 
        width: 170, 
        height: 170
    },
})