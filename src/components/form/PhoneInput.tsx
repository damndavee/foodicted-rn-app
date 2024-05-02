import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import MaskInput from 'react-native-mask-input';
import { Select, View, Text } from 'native-base'
import tokens from '../../utils/tokens';
import { PhoneInputProps } from '../../types/components/phoneInput';
import { PHONE_CODES_WITH_MASK_DATA } from '../../utils/data';

const PhoneInput = (props: PhoneInputProps) => {
    const [phoneCode, setPhoneCode] = useState<string>(PHONE_CODES_WITH_MASK_DATA[0].code);

    const getMaskByPhoneCode = (code: string): any => {
        return PHONE_CODES_WITH_MASK_DATA.find(phone => phone.code === code)?.mask;
    }

    const renderLabel = (label: string) => {
        return label.includes(phoneCode) ? label.split(' ')[0] : label;
    }

    const renderLeftAddon = () => {
        return (
            <Select
                w="full"
                flex={1}
                borderWidth={0}
                borderRightWidth={1.5}
                borderRadius={0}
                borderColor={tokens.color.secondary.dark}
                padding={2}
                bgColor={tokens.color.primary.default}
                fontSize={tokens.fontSize.medium}
                _selectedItem={{
                    bg: tokens.color.primary.default,
                    startIcon: <Text fontWeight={500} color={tokens.color.tertiary.dark} >Selected: </Text>,
                }}
                color={tokens.color.tertiary.dark}
                dropdownIcon={<Ionicons size={30} name='chevron-down-outline' color={tokens.color.tertiary.default} />}
                selectedValue={phoneCode}
                onValueChange={(item) => {
                    setPhoneCode(item);
                    props.onReset();
                }}
            >
                {PHONE_CODES_WITH_MASK_DATA.map(code => <Select.Item label={renderLabel(`${code.code} (${code.country})`)} value={code.code} />)}
            </Select>
        );
    };

    return (
        <View flexDir="row" borderWidth={1.5} overflow="hidden" borderRadius={5} borderColor={tokens.color.secondary.dark} >
            {renderLeftAddon()}
            <MaskInput
                style={styles.maskInput}
                value={props.value}
                placeholder='Enter phone number'
                keyboardType='numeric'
                mask={[...getMaskByPhoneCode(phoneCode)]}
                onChangeText={props.onChange}
            />
        </View>
    )
}

export default PhoneInput;

const styles = StyleSheet.create({
    inputLeftAddon: {
        borderWidth: 0,
        borderRadius: 0,
        borderColor: tokens.color.secondary.dark,
        backgroundColor: tokens.color.primary.default,
    },
    maskInput: {
        paddingHorizontal: tokens.spacing.medium,
        flex: 3, 
        borderColor: tokens.color.secondary.dark,
        fontSize: tokens.fontSize.medium
    }
});