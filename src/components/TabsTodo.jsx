import React from "react";
import { Tabs } from "antd";

import TableTodoItem from "./TableTodoItem";
import "./TabsTodo.scss";

function TabsTodo({ lists }) {
    return (
        <Tabs
            className="tab"
            size="large"
            defaultActiveKey="1"
            items={[
                {
                    className: "tab-todo",
                    label: `Todo`,
                    key: "1",
                    children: <TableTodoItem listTodos={lists ? lists.filter((todo) => todo.checked === false) : []} />,
                },
                {
                    className: "tab-done",
                    label: `Done`,
                    key: "2",
                    children: <TableTodoItem listTodos={lists ? lists.filter((todo) => todo.checked === true) : []} />,
                },
            ]}
        />
    );
}

export default TabsTodo;
