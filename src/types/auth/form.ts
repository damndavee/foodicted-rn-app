import { ObjectSchema } from "yup";

export type Fields = 'email' | 'password' | 'confirmPassword';

export type SignUpForm = Record<Fields, string>;
export type SignInForm = Record<Exclude<Fields, 'confirmPassword'>, string>;

export type ValidationSchema = ObjectSchema<SignUpForm | SignInForm>;