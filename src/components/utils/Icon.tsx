import { View } from "react-native";
import { Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "../../types/components/icon";
import { GenericComponentColorThemeMap, GenericComponentColorThemeIndex } from "../../types/components/generic";
import tokens from "../../utils/tokens";

const Icon = (props: IconProps) => {
    const sizesMap = {
        'Xsmall': 25,
        'Small': 30,
        'Medium': 40,
        'Big': 60, 
        'Large': 80
    };

    const iconProps = {
        name: props.name,
        size: sizesMap[props.size],
        padding: props.variant === 'Ghost' ? 0 : sizesMap[props.size] / tokens.radius.medium,
    };

    const onPressHandler = () => {
        if(!props.onPress) return;

        props.onPress();
    }

    const getIconColorPalette = (isPressed: boolean, isHovered: boolean) => {
        const active = GenericComponentColorThemeMap[props.type][GenericComponentColorThemeIndex.Active];
        const pressed = GenericComponentColorThemeMap[props.type][GenericComponentColorThemeIndex.Pressed];
        const color = GenericComponentColorThemeMap[props.type][GenericComponentColorThemeIndex.Color];

        const activeColorIndicator = isPressed || isHovered ? pressed : active;

        const typeIndicatedColorPalette = {
            'Filled': [activeColorIndicator, color, 'transparent'],
            'Outline': ['transparent', activeColorIndicator, activeColorIndicator],
            'Ghost': ['transparent', activeColorIndicator, 'transparent']
        }

        return typeIndicatedColorPalette[props.variant]
    };

    return (
        <Pressable flexDirection='row' onPress={onPressHandler}>
            {({isHovered, isFocused, isPressed}) => {
                const shouldActivatePressEvent = props.onPress ? isPressed : false;
                const shouldActivateHoverEvent = props.onPress ? isHovered: false;

                const [iconBgColor, iconTextColor, borderColor] = getIconColorPalette(shouldActivatePressEvent, shouldActivateHoverEvent);

                return (
                    <View style={{backgroundColor: iconBgColor, borderColor, borderWidth: 2, borderRadius: +(props.radius || 0)}}>
                        <Ionicons {...iconProps} color={iconTextColor} />
                    </View>
                );
            }}
        </Pressable>
    );
};

export default Icon;