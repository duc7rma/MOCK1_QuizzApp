import { createContext, useReducer } from "react";

import todoReducer, { initialValue } from "../reducers/TodoReducer";

export const TodoContext = createContext();

function TodoListProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialValue);

    localStorage.setItem("listTodos", JSON.stringify(state.listTodos));

    return <TodoContext.Provider value={[state, dispatch]}>{children}</TodoContext.Provider>;
}

export default TodoListProvider;
