export enum Templates {
    Signin = 'Signin',
    Signup = 'Signup'
};

// TODO: change 'any' to actual types after implementation of FormControllInput
export type Template = {
    name: Templates;
    header: string;
    ctaText: string;
    link: string;
    fields: any;
    state: any;
    validators: any[]
};