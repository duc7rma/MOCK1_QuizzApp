import * as actions from '../../constants/constants-action-todo'

const setName = (key, payload) => {
    return {
        type: actions.SET_NAME,
        payload,
        key: key,
    }
}

const setDescription = (key, payload) => {
    return {
        type: actions.SET_DESCRIPTION,
        payload,
        key: key,
    }
}

const addTodo = (payload) => {
    return {
        type: actions.ADD_TODO,
        payload
    }
}

const removeTodo = payload => {
    return {
        type: actions.REMOVE_TODO,
        payload
    }
}

const updateTodo = payload => {
    return {
        type: actions.UPDATE_TODO,
        payload
    }
}

const toggleChecked = (key, checked) => {
    return {
        type: actions.TOGGLE_CHECKED,
        key,
        checked: checked
    }
}

const toggleEditing = (key, isEditing) => {
    return {
        type: actions.TOGGLE_EDITING,
        key,
        isEditing: isEditing
    }
}

export { setName, setDescription, addTodo, removeTodo, updateTodo, toggleChecked, toggleEditing }