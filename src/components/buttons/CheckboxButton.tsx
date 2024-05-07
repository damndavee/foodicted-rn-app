import { Checkbox, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import Button from './Button';
import tokens from '../../utils/tokens';
import { CheckboxProps } from '../../types/components/props/checkboxButton';

const CheckboxButton = (props: CheckboxProps) => {
    return (
        <Checkbox colorScheme="emerald" onChange={props.onCheck} isChecked={props.isChecked} value="rememberMeCheck" >
            <Text style={styles.checkboxText}>{props.label}</Text>
            {props.customAction && (
                <Button 
                    label={props.customAction.label}
                    onPress={props.customAction.action} 
                    size='Medium' 
                    dense 
                    type='Tertiary' 
                    variant='Ghost' 
                    textStyle={{ 
                        fontSize: tokens.fontSize.medium,
                        fontWeight: 600
                    }} />
            )}
        </Checkbox>
    )
}

export default CheckboxButton;

const styles = StyleSheet.create({
    checkboxText: {
        color: tokens.color.primary.dark,
        fontSize: tokens.fontSize.medium
    }
})