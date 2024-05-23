export enum AppProviders {
    APPLE = 'APPLE',
    FACEBOOK = 'FACEBOOK',
    GOOGLE = 'GOOGLE',
};

export interface CustomProviderAuthArguments {
    uid: string;
    provider: keyof typeof AppProviders;
};

export interface AuthUser {
    phoneNumber: string | null;
    email: string | null;
    displayName: string | null; 
    avatarUrl: string | null;
    nickname: string | null;
};

export interface OnboardingFlags {
    showOnboarding: boolean, 
    termsAndConditionsAgreed: boolean, 
    biometricsEnabled: boolean, 
    notificationEnabled: boolean, 
    isNicknameSkipped: boolean, 
    isPhoneNumberSkipped: boolean, 
};

export type UserWithOnboardingFlags = AuthUser & OnboardingFlags;