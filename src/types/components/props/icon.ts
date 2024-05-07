import { ExcludeComponentVariant, GenericComponentSize, GenericComponentType, Icon } from "../generic";

export interface IconProps {
    name: Icon;
    size: keyof typeof GenericComponentSize;
    variant: ExcludeComponentVariant<'Underline'>;
    type: keyof typeof GenericComponentType;
    onPress?: () => void;
    radius?: number;
};