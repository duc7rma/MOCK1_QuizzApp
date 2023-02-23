import * as yup from "yup";
import { regexEmail } from './../regex';

export const signUpSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Your name is required'),
    email: yup
        .string("Enter your phone")
        .matches(regexEmail, "Invalid Email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});