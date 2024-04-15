import { StyleSheet, Text, View } from 'react-native';
import tokens from '../../utils/tokens';
import { Divider } from 'native-base';
import Icon from '../utils/Icon';
import Button from '../buttons/Button';
import { useTemplateContext } from '../../context/Template';
import { Templates } from '../../types/template';
import { IconProps } from '../../types/components/icon';
import useAuthProviders from '../../hooks/useAuthProviders';

const AuthButtons = () => {
    const templateContext = useTemplateContext();
    const { Google } = useAuthProviders();

    const handleNavigateWithTemplate = (template: Templates) => {
        templateContext.navigateWithTemplate(({template, pathname: '/auth'}));
    }

    const defaultIconProps: Omit<IconProps, 'name'> = {
        variant: 'Filled',
        radius: tokens.radius.large,
        size: 'Medium',
        type: 'Primary'
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.big }}>
                <Divider flex={1} thickness={1} bgColor={tokens.color.primary.dark} />
                <Text style={styles.additionalLoginText}>Sign in methods</Text>
                <Divider flex={1} thickness={1} bgColor={tokens.color.primary.dark} />
            </View>
            <View style={styles.additionalLoginContainer}>
                <Icon name="logo-google" {...defaultIconProps} onPress={Google.signIn} />
                <Icon name="logo-apple" {...defaultIconProps} onPress={Google.logout} />
                <Icon name="logo-facebook" {...defaultIconProps} />
                <Icon name="mail-open" {...defaultIconProps} onPress={() => handleNavigateWithTemplate(Templates.Signin)} />
            </View>
            <Button  
                onPress={() => handleNavigateWithTemplate(Templates.Signup)} 
                size='Medium' 
                type='Secondary' 
                variant='Ghost'
                textStyle={{
                    isBold: true,
                    isUnderline: true
                }}
                label="Create a new account"
                selfAlignment='center'
            />
        </View>
    )
};

export default AuthButtons;

const styles = StyleSheet.create({
    additionalLoginText: {
        fontSize: tokens.fontSize.medium,
        color: tokens.color.primary.dark
    },
    additionalLoginContainer: {
        marginTop: tokens.spacing.big,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.xlarge
    },
});