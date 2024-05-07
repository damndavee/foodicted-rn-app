import { FlexAlignType } from 'react-native/types';
import { GenericComponentType, Icon, ExcludeComponentVariant, ExcludeComponentSize } from '../generic';

interface ButtonFontStyle {
    fontSize?: number;
    isUnderline?: boolean;
    isItalic?: boolean;
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export interface ButtonProps {
    label: string;
    type: keyof typeof GenericComponentType;
    size: ExcludeComponentSize<'Xsmall'>;
    variant: ExcludeComponentVariant<'Underline'>;
    onPress: () => void;
    fullWidth?: boolean;
    leftIcon?: Icon;
    rightIcon?: Icon;
    flex?: 0 | 1;
    selfAlignment?: FlexAlignType;
    dense?: boolean;
    textStyle?: ButtonFontStyle;
}