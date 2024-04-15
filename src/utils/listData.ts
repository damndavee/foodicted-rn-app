import { ListItemInputData } from "../types/components/listItem";

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
    // {
    //     headingText: 'Reset via Email',
    //     bodyText: 'Select option to receive password code',
    //     icon: 'copy-sharp',
    //     id: 'copacabana'
    // },
    // {
    //     headingText: 'Reset via Email',
    //     bodyText: 'Select option to receive password code',
    //     icon: 'logo-css3',
    //     id: 'css'
    // },
];