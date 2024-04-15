import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Template, Templates } from "../types/template";
import { router } from 'expo-router';
import { validationSigninSchema, validationSignupSchema } from '../utils/validation';
import { ValidationSchema } from '../types/auth/form';

interface TemplateContextType {
    template: Template | null;
    validationSchema: ValidationSchema | null;
    setTemplate: (template: keyof typeof Templates) => void;
    navigateWithTemplate: (props: NavigateWithTemplateProps) => void;
};

interface NavigateWithTemplateProps {
    template: keyof typeof Templates;
    pathname: string;
    params?: any;
}

export const TemplateContext = createContext<TemplateContextType | null>(null);

export const TemplateContextProvider = (props: PropsWithChildren) => {
    const TemplateMap: Record<Templates, any> = {
        [Templates.Signin]: require('../templates/signin.json'),
        [Templates.Signup]: require('../templates/signup.json'),
    };

    const ValidationSchemaMap: Record<Templates, ValidationSchema> = {
        [Templates.Signin]: validationSigninSchema,
        [Templates.Signup]: validationSignupSchema,
    };

    const [formTemplate, setFormTemplate] = useState<Template | null>(null);
    const [validationSchema, setValidationSchema] = useState<ValidationSchema | null>(null);

    const navigateWithTemplate = ({pathname, template, params}: NavigateWithTemplateProps) => {
        router.navigate({pathname, params});
        setFormTemplate(TemplateMap[template]);
        setValidationSchema(ValidationSchemaMap[template]);
    };

    const setTemplateHandler = (template: keyof typeof Templates) => {
        setValidationSchema(ValidationSchemaMap[template]);
        setFormTemplate(TemplateMap[template]);
    };

    return (
        <TemplateContext.Provider value={{template: formTemplate, validationSchema, setTemplate: setTemplateHandler, navigateWithTemplate}}>
            {props.children}
        </TemplateContext.Provider>
    )
};

export const useTemplateContext = () => {
    const context = useContext(TemplateContext);

    if(!context) {
        throw new Error('useTemplateContext must be used within a TemplateContextProvider');
    }

    return context;
}