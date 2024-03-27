import { StyleSheet, View } from 'react-native';
import { Templates } from '../../types/template'
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import { router } from 'expo-router';

type FormFooterProps = {
    templateName: keyof typeof Templates;
}

const FormFooter = (props: FormFooterProps) => {
    if(props.templateName === 'Signup') {
        return null;
    }

    const gotToForgotPasswordScreen = () => router.navigate('/forgot-password');

    return (
        <View style={styles.container}>
            <Button label='Forgot password?' onPress={gotToForgotPasswordScreen} size='Medium' type='Secondary' variant='Ghost' dense selfAlignment='center' textStyle={{
                fontSize: 18,
                isBold: true,
                isUnderline: true,
            }} />
            <View style={styles.innerContainer}>
                <IconButton name='logo-google' type='Primary' onPress={() => {}} size='Small' rounded showBackground />
                <IconButton name='logo-apple' type='Primary' onPress={() => {}} size='Small' rounded showBackground />
                <IconButton name='logo-facebook' type='Primary' onPress={() => {}} size='Small' rounded showBackground />
            </View>
        </View>
    );
};

export default FormFooter

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    innerContainer: {
        flexDirection: 'row', 
        gap: 10
    }
})