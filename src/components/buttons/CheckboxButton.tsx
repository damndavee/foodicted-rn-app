import { Checkbox } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import Button from './Button';
import tokens from '../../utils/tokens';
import { CheckboxProps } from '../../types/components/checkboxButton';

const CheckboxButton = (props: CheckboxProps) => {
    return (
        <Checkbox alignItems="center" colorScheme="emerald" onChange={props.onCheck} isChecked={props.isChecked} value="rememberMeCheck" >
            <Text style={styles.checkboxText}>{props.label}</Text>
            {props.customAction && (
                <Button 
                    label={props.customAction.label}
                    onPress={props.customAction.action} 
                    size='Medium' 
                    dense 
                    type='Tertiary' 
                    variant='Ghost' 
                    textStyle={{ fontSize: tokens.fontSize.medium, isBold: true}} />
            )}
        </Checkbox>
    )
}

export default CheckboxButton;

const styles = StyleSheet.create({
    checkboxText: {
        fontSize: tokens.fontSize.medium,
        color: tokens.color.primary.dark
    }
})