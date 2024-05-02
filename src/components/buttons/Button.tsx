import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Pressable, DimensionValue, View } from 'react-native';
import { Text } from "native-base";

import { ButtonProps } from '../../types/components/props/button';
import { GenericComponentVariant, GenericComponentColorThemeMap, GenericComponentColorThemeIndex, GenericComponentSizeIndex, COMPONENT_SIZE, StyleProps } from '../../types/components/generic';
import tokens from '../../utils/tokens';

const Button = (props: ButtonProps) => {
    const getButtonStyles = (pressed: boolean, isText: boolean = false): StyleProps  => {
        const isFilled = props.variant === GenericComponentVariant.Filled;
        const isOutline = props.variant === GenericComponentVariant.Outline;
        const buttonWidth = props.fullWidth ? '100%' : 'auto' as DimensionValue;
        const color = GenericComponentColorThemeMap[props.type];
        const pressedColor = pressed ? color[GenericComponentColorThemeIndex.Pressed] : color[GenericComponentColorThemeIndex.Active];
        const fontSize = props.textStyle?.fontSize || COMPONENT_SIZE[props.size][GenericComponentSizeIndex.FontSize];

        if(isText) {
            return {
                color: isFilled ? color[GenericComponentColorThemeIndex.Color] : pressedColor,
                fontSize,
            }
        }

        const additionalProps: StyleProps = {};
        
        if(props.flex) additionalProps.flex = props.flex;
        if(props.selfAlignment) additionalProps.alignSelf = props.selfAlignment;

        return {
            backgroundColor: isFilled ? pressedColor : 'transparent',
            borderColor: isFilled ? 'transparent' : pressedColor,
            borderWidth: isOutline ? 2 : 0,
            width: buttonWidth,
            paddingVertical: props.dense ? 0 : COMPONENT_SIZE[props.size][GenericComponentSizeIndex.Spacing],
            paddingHorizontal: props.dense ? 0 : 2 * COMPONENT_SIZE[props.size][GenericComponentSizeIndex.Spacing],
            ...additionalProps
        }
    }

    return (
        <Pressable onPress={props.onPress} style={({ pressed }) => [styles.buttonContainer, getButtonStyles(pressed)]}>
            {({ pressed }) => (
                <>
                    {props.leftIcon && (
                        <View style={{paddingRight: COMPONENT_SIZE[props.size][GenericComponentSizeIndex.Spacing] - 4}}>
                            <Ionicons name={props.leftIcon} size={getButtonStyles(pressed, true)['fontSize']! + 8} color={getButtonStyles(pressed, true)['color']} />
                        </View>
                    )}
                    <Text italic={props.textStyle?.isItalic} bold={props.textStyle?.isBold} underline={props.textStyle?.isUnderline} style={[getButtonStyles(pressed, true)]}>{props.label}</Text>
                    {props.rightIcon && (
                        <View style={{paddingLeft: COMPONENT_SIZE[props.size][GenericComponentSizeIndex.Spacing] - 4}}>
                            <Ionicons name={props.rightIcon} size={getButtonStyles(pressed, true)['fontSize']! + 8} color={getButtonStyles(pressed, true)['color']} />
                        </View>
                    )}
                </>
            )}
        </Pressable>
    )
}

export default Button;

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.big,
    }
})