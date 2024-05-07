import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import CheckboxButton from "../buttons/CheckboxButton";
import { CheckboxProps } from "../../types/components/props/checkboxButton";
import { Template, Templates } from "../../types/template";
import { router } from "expo-router";
import Button from "../buttons/Button";
import tokens from "../../utils/tokens";

type FormFooterProps = {
    template: Template;
}

const FormFooter = (props: FormFooterProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

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

    const handleOnCheck = () => {
        setIsChecked(prevState => !prevState);
    };

    const handleGoToForgotPasswordScreen = () => {
        router.navigate('/forgot-password');
    };

    return (
        <View style={styles.rootContainer}>
            <CheckboxButton isChecked={isChecked} onCheck={handleOnCheck} {...checkboxCopies[props.template.name]} />
            {props.template.name === Templates.Signin && (
                <Button 
                    label='Forgot password?' 
                    onPress={handleGoToForgotPasswordScreen} 
                    size='Medium' 
                    type='Tertiary' 
                    variant='Ghost' 
                    dense 
                    textStyle={{
                        fontSize: tokens.fontSize.medium,
                        fontWeight: 600
                    }} 
                />
            )}
        </View>
    )
}

export default FormFooter

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})