import { View, StyleSheet, Text } from 'react-native';
import { FormControl, Input, WarningOutlineIcon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { FormInputProps } from "../../types/components/formInput";
import { COLORS, FONT_SIZES } from '../../utils/tokens';
import { ExcludeComponentVariant, GenericComponentVariant, StyleProps } from '../../types/components/generic';

const FormInput = (props: FormInputProps) => {
  const renderLeftInputElement = () => {
    return props.icon &&  (
        <Ionicons
          style={{paddingLeft: 5}}
          name={props.icon} 
          size={FONT_SIZES.big} 
          color={props.variant === "Filled" ? "white" : COLORS.secondaryDark}
        />
    )
  };

  const INPUT_VARIANT_STYLES: Record<ExcludeComponentVariant<'Ghost'>, StyleProps> = {
    [GenericComponentVariant.Filled]: styles.filled,
    [GenericComponentVariant.Outline]: styles.outline,
    [GenericComponentVariant.Underline]: styles.underline
  };

  const inputProps = {
    ...INPUT_VARIANT_STYLES[props.variant],
    fontSize: FONT_SIZES.medium,
    onChangeText: props.onChange,
    placeholder: props.placeholder,
    placeholderTextColor: props.variant === "Filled" ? "lightText" : COLORS.secondaryDark,
    leftElement: renderLeftInputElement(),
    type: props.type,
    value: props.value
  }

  return (
    <FormControl isInvalid={!props.isValid}>
        <Input {...inputProps} borderBottomColor={'yellow.300'} />
        <FormControl.ErrorMessage 
          backgroundColor={COLORS.warning} 
          _text={{color: COLORS.danger, textAlign: 'justify', textBreakStrategy: 'balanced' }}
          padding={1}
          w='full'
          leftIcon={<WarningOutlineIcon style={{ margin: 5 }} />} 
        >
          {props.errorMessage}
        </FormControl.ErrorMessage>
    </FormControl>
  )
};

const styles = StyleSheet.create({
  outline: {
    borderRadius: 5,
    borderWidth: 2,
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
    borderBottomWidth: 2,
    borderColor: COLORS.secondaryDark,
  },
})

export default FormInput