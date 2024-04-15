import { StyleSheet } from 'react-native';
import { FormControl, IInputProps, Input, InputGroup, InputLeftAddon, WarningOutlineIcon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { FormInputProps } from "../../types/components/formInput";
import tokens from '../../utils/tokens';
import { ExcludeComponentVariant, GenericComponentVariant, StyleProps } from '../../types/components/generic';

const FormInput = (props: FormInputProps) => {

  const renderAddonIcon = () => {
    return props.icon && (
      <Ionicons
        name={props.icon} 
        size={tokens.fontSize.large} 
        color={props.variant === "Filled" ? "white" : tokens.color.secondary.dark}
      />
    )
  };

  const INPUT_VARIANT_STYLES: Record<ExcludeComponentVariant<'Ghost'>, StyleProps> = {
    [GenericComponentVariant.Filled]: styles.filled,
    [GenericComponentVariant.Outline]: styles.outline,
    [GenericComponentVariant.Underline]: styles.underline
  };

  const inputProps: IInputProps = {
    fontSize: tokens.fontSize.medium,
    onChangeText: props.onChange,
    placeholder: props.placeholder,
    placeholderTextColor: props.variant === "Filled" ? "lightText" : tokens.color.secondary.dark,
    type: props.type,
    value: props.value,
    flex: 1,
  }

  return (
    <FormControl isInvalid={!props.isValid}>
        <InputGroup {...INPUT_VARIANT_STYLES[props.variant]} >
          <InputLeftAddon style={styles.inputLeftAddon} children={renderAddonIcon()} />
          <Input borderWidth={0} {...inputProps} />
          <FormControl.ErrorMessage 
            backgroundColor={tokens.color.warning} 
            _text={{color: tokens.color.danger, textAlign: 'justify', textBreakStrategy: 'balanced' }}
            padding={1}
            w='full'
            leftIcon={<WarningOutlineIcon style={{ margin: tokens.spacing.xsmall }} />} 
          >
            {props.errorMessage}
          </FormControl.ErrorMessage>
        </InputGroup>
    </FormControl>
  )
};
  
const styles = StyleSheet.create({
  outline: {
    borderRadius: tokens.radius.medium,             
    borderWidth: 1.5,
    borderColor: tokens.color.secondary.dark,
  },
  filled: {
    backgroundColor: tokens.color.text,
    borderRadius: tokens.radius.medium,
    borderWidth: 0,
  },
  underline: {
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderColor: tokens.color.secondary.dark,
  },
  inputLeftAddon: {
    borderWidth: 0,
    backgroundColor: tokens.color.primary.default,
    borderRightWidth: 1.5,
    borderColor: tokens.color.secondary.dark,
  }
})

export default FormInput