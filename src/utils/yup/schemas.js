import * as yup from "yup";

const todoSchema = yup
    .object({
        name: yup.string().required("Please enter todo name."),
        description: yup.string().required("Please enter todo description.").max(500, "Must be max 200 characters."),
    })
    .required();

export { todoSchema }