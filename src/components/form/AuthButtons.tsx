import { StyleSheet, View } from 'react-native';
import tokens from '../../utils/tokens';
import { Divider, Text } from 'native-base';
import Icon from '../utils/Icon';
import Button from '../buttons/Button';
import { useTemplateContext } from '../../context/Template';
import { Templates } from '../../types/template';
import { IconProps } from '../../types/components/props/icon';
import useAuthProviders from '../../hooks/useAuthProviders';

const AuthButtons = () => {
    const templateContext = useTemplateContext();
    const { GoogleAuthentication, FacebookAuthentication, AppleAuthentication } = useAuthProviders();

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
                <Text style={styles.additionalLoginText}>You can connect with</Text>
                <Divider flex={1} thickness={1} bgColor={tokens.color.primary.dark} />
            </View>
            <View style={styles.additionalLoginContainer}>
                <Icon name="logo-google" {...defaultIconProps} onPress={GoogleAuthentication.signin} />
                <Icon name="logo-apple" {...defaultIconProps} onPress={AppleAuthentication.signin} />
                <Icon name="logo-facebook" {...defaultIconProps} onPress={FacebookAuthentication.signin} />
                <Icon name="mail-open" {...defaultIconProps} onPress={() => handleNavigateWithTemplate(Templates.Signin)} />
            </View>
            <Button  
                onPress={() => handleNavigateWithTemplate(Templates.Signup)} 
                size='Medium' 
                type='Secondary' 
                variant='Ghost'
                textStyle={{
                    fontWeight: 700,
                    isUnderline: true,
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