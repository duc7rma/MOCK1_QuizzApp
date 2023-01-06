import { Switch, Table } from "antd";
import React, { useContext, useState } from "react";

import { DeleteIcon, UpdateIcon } from "../assets/icons";
import * as actions from "../stores/actions/todoActions";
import { TodoContext } from "../stores/providers/TodoListProvider";
import ModalUpdate from "./ModalUpdate";
import "./Table.scss";

function TableTodoItem({ listTodos }) {
    const [state, dispatch] = useContext(TodoContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keyEditing, setKeyEditing] = useState();
    const [nameDefault, setNameDefault] = useState();
    const [descDefault, setDescDefault] = useState();

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            // key: "id",
            render: (index) => {
                return <p>{index + 1}</p>;
            },
            width: "5%",
        },

        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "30%",
            render: (name) => <p>{name}</p>,
        },

        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (description) => <p>{description}</p>,
        },

        {
            title: "Checked",
            key: "checked",
            dataIndex: "checked",
            render: (checked, index) => (
                <Switch
                    defaultChecked={checked}
                    onChange={(e) => {
                        dispatch(actions.toggleChecked(index.key, e));
                    }}
                />
            ),
            width: "7%",
        },

        {
            title: "Action",
            key: "action",
            render: (index) => (
                <div className="table-button">
                    <button
                        type="button"
                        className={`table-button-update ${index.isEditing && "disabled"}`}
                        onClick={() => {
                            dispatch(actions.toggleEditing(index.key, true));
                            setIsModalOpen(true);
                            setKeyEditing(index.key);
                            setDescDefault(index.description);
                            setNameDefault(index.name);
                        }}
                    >
                        <UpdateIcon />
                    </button>
                    <button
                        onClick={() => {
                            dispatch(actions.removeTodo(index.key));
                        }}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
            width: "10%",
        },
    ];

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    let newListWithId = listTodos.map((todo, index) => {
        return {
            ...todo,
            id: index,
        };
    });

    console.log(listTodos);

    return (
        <div className="table-layout">
            <Table
                className="table-container"
                columns={columns}
                dataSource={newListWithId}
                pagination={{ defaultPageSize: 4, showSizeChanger: true, pageSizeOptions: ["4", "10", "20", "30"] }}
            />
            <ModalUpdate
                isModalOpen={isModalOpen}
                keyEditing={keyEditing}
                nameDefault={nameDefault}
                descDefault={descDefault}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </div>
    );
}

export default TableTodoItem;
