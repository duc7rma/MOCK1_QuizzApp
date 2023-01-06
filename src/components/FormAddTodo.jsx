import { Field, Form, Formik, getIn } from "formik";
import { useContext } from "react";

import { PlusIcon } from "../assets/icons";
import * as actions from "../stores/actions/todoActions";
import { TodoContext } from "../stores/providers/TodoListProvider";
import { todoSchema } from "../utils/yup/schemas";
import "./FormAddTodo.scss";

function getStyles(errors, fieldName) {
    if (getIn(errors, fieldName)) {
        return {
            border: "1px solid red",
        };
    }
}

function FormAddTodo() {
    const [state, dispatch] = useContext(TodoContext);

    return (
        <div className="form-todo-formik">
            <Formik
                initialValues={{ name: "", description: "" }}
                validationSchema={todoSchema}
                onSubmit={(values, { resetForm }) => {
                    let newValues = { ...values, checked: false, key: state.listTodos.length, isEditing: false };
                    resetForm();
                    dispatch(actions.addTodo(newValues));
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="form-todo">
                        <div className="form-todo_left">
                            <Field
                                name="name"
                                type="text"
                                placeholder="Name"
                                className="form-todo_left_input"
                                style={getStyles(errors, "name")}
                            />
                            {/* <ErrorMessage name="name" /> */}
                            {errors.name && touched.name && <p className="form-todo-errors">{errors.name}</p>}

                            <Field
                                name="description"
                                type="text"
                                placeholder="Description..."
                                className="form-todo_left_input"
                                style={getStyles(errors, "description")}
                            />
                            {/* <ErrorMessage name="description" /> */}
                            {errors.description && touched.description && (
                                <p className="form-todo-errors">{errors.description}</p>
                            )}
                        </div>

                        <div className="form-todo_right">
                            <button type="submit" className="form-todo_right_btn-submit" disabled={isSubmitting}>
                                <PlusIcon style={{ marginRight: "16px" }} />
                                Add new item
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormAddTodo;
