import { useEffect, useState } from 'react';
import { useTemplateContext } from '../context/Template';
import { Form } from '../types/auth/form';
import { Templates } from '../types/template';

const useForm = () => {
    const templateContext = useTemplateContext();
    // TODO: pass template state template related: sign in just nickname and password
    const [userData, setUserData] = useState<Form>(templateContext.template?.state);

    useEffect(() => {
        setUserData(templateContext.template?.state);
    }, [templateContext.template])

    const onChangeHandler = (id: string, enteredValue: string | number | boolean): void => {
        setUserData((prevState: Form) => ({
            ...prevState,
            [id]: enteredValue
        }))
    };

    const onSubmitHandler = () => {
        // TODO: add logic for both signin and signup
        console.log("USER DATA: ", userData);

        if(templateContext.template?.name === Templates.Signin) {
            console.log("SIGN IN!@");
        } else {
            console.log("SIGN UP!@");
        }
    }

    const switchAuthFormType = () => {
        const temp = templateContext.template?.name === Templates.Signin ? Templates.Signup : Templates.Signin;
        templateContext.setTemplate(temp);
    }

    return {
        userData,
        handleChange: onChangeHandler,
        handleSubmit: onSubmitHandler,
        handleSwitchAuthFormType: switchAuthFormType
    };
};

export default useForm;