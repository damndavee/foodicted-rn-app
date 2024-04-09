import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_SIZES } from '../../utils/tokens';
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
        radius: 10,
        size: 'Medium',
        type: 'Primary'
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                <Divider flex={1} thickness={1} bgColor={COLORS.primaryDark} />
                <Text style={styles.additionalLoginText}>Sign in methods</Text>
                <Divider flex={1} thickness={1} bgColor={COLORS.primaryDark} />
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
        fontSize: FONT_SIZES.medium,
        color: COLORS.primaryDark
    },
    additionalLoginContainer: {
        marginTop: 15,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
});