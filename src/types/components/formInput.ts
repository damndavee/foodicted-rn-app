import { Icon, ExcludeComponentVariant } from "./generic";


export interface FormInputProps {
    type: 'text' | 'password';
    isValid: boolean;
    id: string;
    errorMessage: string;
    placeholder: string;
    value: string;
    variant: ExcludeComponentVariant<'Ghost'>;
    onChange: (id: string, enteredValue: string | number | boolean) => void;
    label?: string;
    inputProps?: object;
    icon?: Icon;
}