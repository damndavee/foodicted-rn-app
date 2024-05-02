import { ListItemInputData } from "../types/components/props/listItem";

export const FORGOT_PASSWORD_SCREEN_DATA: ListItemInputData[] = [
    {
        headingText: 'Reset via Email',
        bodyText: 'Select option to receive password code',
        icon: 'mail-outline',
        id: 'mail'
    },
    {
        headingText: 'Reset via Phone',
        bodyText: 'Select option to receive password code',
        icon: 'chatbox-outline',
        id: 'sms'
    },
];

export const PHONE_CODES_WITH_MASK_DATA = [
    { code: '+48', mask: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/], country: 'Poland' },
    { code: '+49', mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/], country: 'Germany' },
    { code: '+1', mask: ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/], country: 'USA' },
    { code: '+33', mask: [/\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/], country: 'France' },
    { code: '+61', mask: [/\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/], country: 'Australia' },
    { code: '+44', mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/], country: 'UK' }
];