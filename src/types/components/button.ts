import { FlexAlignType } from 'react-native/types';
import { GenericComponentSize, GenericComponentType, Icon, ExcludeComponentVariant } from './generic';

export interface ButtonProps {
    label: string;
    type: keyof typeof GenericComponentType;
    size: keyof typeof GenericComponentSize;
    variant: ExcludeComponentVariant<'Underline'>;
    onPress: () => void;
    fullWidth?: boolean;
    leftIcon?: Icon;
    rightIcon?: Icon;
    flex?: 0 | 1;
    selfAlignment?: FlexAlignType;
    dense?: boolean;
}