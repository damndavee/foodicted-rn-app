import * as Yup from 'yup';
import { SignInForm, SignUpForm } from '../types/auth/form';

export const validationSignupSchema = Yup.object<SignUpForm>().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain: One uppercase, One lowercase, One number and One special case character"
    ),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Confirm password is required')
});

export const validationSigninSchema = Yup.object<SignInForm>().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
});
