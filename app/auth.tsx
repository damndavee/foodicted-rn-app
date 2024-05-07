import { StyleSheet, View, ImageBackground, ImageResizeMode } from 'react-native';
import { Heading } from 'native-base';

import Button from '../src/components/buttons/Button';
import { useTemplateContext } from '../src/context/Template';
import tokens from '../src/utils/tokens';

import { Templates } from '../src/types/template';
import FormInput from '../src/components/form/FormInput';
import { FormInputProps } from '../src/types/components/props/formInput';
import { Formik } from 'formik';
import { AuthIlustration } from '../src/components/utils/Ilustration';
import FormFooter from '../src/components/form/FormFooter';

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

    const handleSwitchAuthFormType = (resetCallback: () => void) => {
        const temp = template.name === Templates.Signin ? Templates.Signup : Templates.Signin;
        setTemplate(temp);
        resetCallback();
    };

    return (
        <View style={[styles.rootContainer]}>
            <ImageBackground {...imageProps} >
                <View style={styles.innerContainer}>
                    <View>
                        <Heading fontFamily='heading' fontWeight={700} style={styles.header} size="3xl">{template.header}</Heading>
                        <AuthIlustration style={styles.icon} />
                    </View>
                        <Formik initialValues={template.state} validationSchema={validationSchema} onSubmit={values => console.log("VALUES", values)}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, handleReset }) => (
                                <View style={styles.formInnerContainer}>
                                    <View style={{gap: tokens.spacing.large}}>
                                        {template.fields.map((field: FormInputProps) => {
                                            const isFieldValid = errors[field.id];

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
                                        
                                        <FormFooter template={template} />

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
        padding: tokens.spacing.large,
        gap: tokens.spacing.large + 10,
        justifyContent: 'space-between',
    },
    formInnerContainer: {
        justifyContent: 'space-between',
        flex: 1
    },
    header: {
        alignSelf: "center", 
        color: tokens.color.tertiary.light,
    },
    icon: {
        alignSelf: 'center', 
        width: tokens.dimensions.large, 
        height: tokens.dimensions.large
    },
})