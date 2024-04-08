export interface CustomCheckboxAction {
    action: () => void;
    label: string
}

export interface CheckboxProps {
    customAction?: CustomCheckboxAction;
    onCheck: () => void;
    isChecked: boolean;
    value: string;
    label: string;
}