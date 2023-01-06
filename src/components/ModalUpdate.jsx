import { Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";

import * as actions from "../stores/actions/todoActions";
import { TodoContext } from "../stores/providers/TodoListProvider";
import "./Modal.scss";

const ModalUpdate = ({ nameDefault, descDefault, ...rest }) => {
    const [name, setName] = useState(() => nameDefault);
    const [description, setDescription] = useState(() => descDefault);
    const [state, dispatch] = useContext(TodoContext);

    const { isModalOpen, handleCancel, handleOk, keyEditing } = rest;

    useEffect(() => {
        setName(nameDefault);
        setDescription(descDefault);
    }, [nameDefault, descDefault]);

    return (
        <Modal
            className="modal-update-container"
            title="Update Todo Modal"
            open={isModalOpen}
            onOk={() => {
                console.log(name, description);
                dispatch(actions.setName(keyEditing, name));
                dispatch(actions.setDescription(keyEditing, description));
                handleOk();
            }}
            onCancel={handleCancel}
        >
            <div className="modal-input modal-input_name">
                <label className="modal-label-input_name" htmlFor="">
                    Name
                </label>
                <input
                    // ref={inputNameRef}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>

            <div className="modal-input modal-input_description">
                <label className="modal-label-input_description" htmlFor="">
                    Description
                </label>
                <input
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </div>
        </Modal>
    );
};

export default ModalUpdate;
