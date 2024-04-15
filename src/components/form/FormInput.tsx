import { StyleSheet } from 'react-native';
import { FormControl, IInputProps, Input, InputGroup, InputLeftAddon, WarningOutlineIcon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { FormInputProps } from "../../types/components/formInput";
import { COLORS, FONT_SIZES } from '../../utils/tokens';
import { ExcludeComponentVariant, GenericComponentVariant, StyleProps } from '../../types/components/generic';

const FormInput = (props: FormInputProps) => {

  const renderAddonIcon = () => {
    return props.icon && (
      <Ionicons
        name={props.icon} 
        size={FONT_SIZES.large} 
        color={props.variant === "Filled" ? "white" : COLORS.secondaryDark}
      />
    )
  };

  const INPUT_VARIANT_STYLES: Record<ExcludeComponentVariant<'Ghost'>, StyleProps> = {
    [GenericComponentVariant.Filled]: styles.filled,
    [GenericComponentVariant.Outline]: styles.outline,
    [GenericComponentVariant.Underline]: styles.underline
  };

  const inputProps: IInputProps = {
    fontSize: FONT_SIZES.medium,
    onChangeText: props.onChange,
    placeholder: props.placeholder,
    placeholderTextColor: props.variant === "Filled" ? "lightText" : COLORS.secondaryDark,
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
            backgroundColor={COLORS.warning} 
            _text={{color: COLORS.danger, textAlign: 'justify', textBreakStrategy: 'balanced' }}
            padding={1}
            w='full'
            leftIcon={<WarningOutlineIcon style={{ margin: 5 }} />} 
          >
            {props.errorMessage}
          </FormControl.ErrorMessage>
        </InputGroup>
    </FormControl>
  )
};
  
const styles = StyleSheet.create({
  outline: {
    borderRadius: 5,             
    borderWidth: 1.5,
    borderColor: COLORS.secondaryDark,
  },
  filled: {
    backgroundColor: COLORS.text,
    borderRadius: 5,
    borderWidth: 0,
  },
  underline: {
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderColor: COLORS.secondaryDark,
  },
  inputLeftAddon: {
    borderWidth: 0,
    backgroundColor: COLORS.primary,
    borderRightWidth: 1.5,
    borderColor: COLORS.secondaryDark,
  }
})

export default FormInput