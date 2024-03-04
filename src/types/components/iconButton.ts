import { GenericComponentSize, GenericComponentType, Icon, StyleProps } from "./generic";

export interface IconButtonProps {
    name: Icon;
    type: keyof typeof GenericComponentType;
    size: keyof typeof GenericComponentSize;
    onPress: () => void;
    showBackground?: boolean;
    rounded?: boolean;
    style?: StyleProps;
}