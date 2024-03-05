import { useState } from 'react';
import { useTemplateContext } from '../context/Template';
import { Form } from '../types/auth/form';
import { Templates } from '../types/template';

const useForm = () => {
    const templateContext = useTemplateContext();
    // TODO: pass template state template related: sign in just nickname and password
    const [userData, setUserData] = useState<Form>(templateContext.template?.state);

    const onChangeHandler = (id: string, enteredValue: string | number | boolean): void => {
        setUserData((prevState: Form) => ({
            ...prevState,
            [id]: enteredValue
        }))
    };

    const onSubmitHandler = () => {
        // TODO: add logic for both signin and signup
        if(templateContext.template?.name === Templates.Signin) {
            console.log("SIGN IN!@");
        } else {
            console.log("SIGN UP!@");
        }
    }
    
    const onClearFormDataHandler = () => setUserData(templateContext.template?.state);

    return {
        userData,
        handleChange: onChangeHandler,
        handleSubmit: onSubmitHandler,
        handleClearForm: onClearFormDataHandler
    };
};

export default useForm;