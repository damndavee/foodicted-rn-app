import { Ionicons } from "@expo/vector-icons"
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import tokens from "../../utils/tokens";

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
    [GenericComponentType.Primary]: [tokens.color.primary.default, tokens.color.primary.light, tokens.color.tertiary.default],
    [GenericComponentType.Secondary]: [tokens.color.secondary.default, tokens.color.secondary.light, tokens.color.primary.light],
    [GenericComponentType.Tertiary]: [tokens.color.tertiary.default, tokens.color.tertiary.light, tokens.color.primary.default],
};

export const COMPONENT_SIZE: Record<ExcludeComponentSize<'Xsmall'>, GenericComponentSizeValues> = {
    [GenericComponentSize.Small]: [tokens.fontSize.small, tokens.spacing.medium, tokens.dimensions.small],
    [GenericComponentSize.Medium]: [tokens.fontSize.medium, tokens.spacing.medium, tokens.dimensions.medium],
    [GenericComponentSize.Big]: [tokens.fontSize.big, tokens.spacing.big, tokens.dimensions.big],
    [GenericComponentSize.Large]: [tokens.fontSize.large, tokens.spacing.large, tokens.dimensions.large],
}

export const GenericComponentTypographyMap = {};