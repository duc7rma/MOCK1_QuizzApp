import { useContext } from "react";

import { TodoContext } from "../stores/providers/TodoListProvider";
import FormAddTodo from "../components/FormAddTodo";
import TabsTodo from "../components/TabsTodo";
import "./TodoPage.scss";

function TodoPage() {
    const [state] = useContext(TodoContext);
    const { listTodos } = state;

    return (
        <div className="todo-page">
            <p className="todo-title">Todo App</p>
            <FormAddTodo />
            <TabsTodo lists={listTodos} />
        </div>
    );
}

export default TodoPage;
