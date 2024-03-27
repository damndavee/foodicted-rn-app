import { Ionicons } from "@expo/vector-icons"
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import { COLORS, DIMENSIONS, FONT_SIZES, SPACINGS } from "../../utils/tokens";

export type Icon = keyof typeof Ionicons.glyphMap;


export interface StyleProps {
    [key: string]: ViewStyle | TextStyle | ImageStyle | any;
}

export enum GenericComponentType {
    Primary = 'Primary',
    Secondary = 'Secondary',
    Tertiary = 'Tertiary',
}

export enum GenericComponentSize {
    Xsmall = 'Xsmall',
    Small = 'Small', 
    Medium = 'Medium',
    Big = 'Big',
    Large = 'Large'
}

export enum GenericComponentVariant {
    Outline = 'Outline',
    Filled = 'Filled',
    Ghost = 'Ghost',
    Underline = 'Underline',
}

export type TempComponentVariant = keyof typeof GenericComponentVariant;
export type TempComponentSize = keyof typeof GenericComponentSize;
export type ExcludeComponentVariant<T extends TempComponentVariant> = Exclude<TempComponentVariant, T>;
export type ExcludeComponentSize<T extends TempComponentSize> = Exclude<TempComponentSize, T>;

export enum GenericComponentColorThemeIndex { Active, Pressed, Color };
export enum GenericComponentSizeIndex { FontSize, Spacing, Dimension };
export type GenericComponentColorThemeValues = [string, string, string];
export type GenericComponentSizeValues = [number, number, number];

export const GenericComponentColorThemeMap: Record<GenericComponentType, GenericComponentColorThemeValues> = {
    [GenericComponentType.Primary]: [COLORS.primary, COLORS.primaryLight, COLORS.tertiary],
    [GenericComponentType.Secondary]: [COLORS.secondary, COLORS.secondaryLight, COLORS.secondaryDark],
    [GenericComponentType.Tertiary]: [COLORS.tertiary, COLORS.tertiaryLight, COLORS.primary],
};

export const COMPONENT_SIZE: Record<ExcludeComponentSize<'Xsmall'>, GenericComponentSizeValues> = {
    [GenericComponentSize.Small]: [FONT_SIZES.small, SPACINGS.medium, DIMENSIONS.small],
    [GenericComponentSize.Medium]: [FONT_SIZES.medium, SPACINGS.medium, DIMENSIONS.medium],
    [GenericComponentSize.Big]: [FONT_SIZES.big, SPACINGS.big, DIMENSIONS.big],
    [GenericComponentSize.Large]: [FONT_SIZES.large, SPACINGS.large, DIMENSIONS.large],
}

export const GenericComponentTypographyMap = {};