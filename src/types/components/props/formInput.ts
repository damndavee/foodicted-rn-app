import { ChangeEvent } from "react";
import { Icon, ExcludeComponentVariant } from "../generic";
import { FormikErrors } from "formik";

export interface FormInputProps {
    type: 'text' | 'password';
    isValid: boolean;
    id: string;
    errorMessage: string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined;
    placeholder: string;
    value: string;
    variant: ExcludeComponentVariant<'Ghost'>;
    onChange: (e: string | ChangeEvent<any>) => void;
    onBlur?: (e: any) => void;
    label?: string;
    inputProps?: object;
    icon?: Icon;
}