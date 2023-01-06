import * as actions from '../../constants/constants-action-todo'

const listTodosLocalStorage = JSON.parse(localStorage.getItem('listTodos'))

export const initialValue = {
    name: '',
    description: '',
    listTodos: listTodosLocalStorage ? listTodosLocalStorage : []
}

const todoReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_NAME: {
            let newListTodos = [...state.listTodos]
            newListTodos[action.key].name = action.payload

            return {
                ...state,
                listTodos: newListTodos
            }
        }
        case actions.SET_DESCRIPTION: {
            let newListTodos = [...state.listTodos]
            newListTodos[action.key].description = action.payload

            return {
                ...state,
                listTodos: newListTodos
            }
        }
        case actions.ADD_TODO: {
            return {
                ...state,
                listTodos: [...state.listTodos, action.payload]
            }
        }
        case actions.REMOVE_TODO: {
            let newListTodos = state.listTodos.filter(todo => todo.key !== action.payload)

            return {
                ...state,
                listTodos: newListTodos
            }
        }

        case actions.TOGGLE_CHECKED: {
            let newListTodos = [...state.listTodos]
            newListTodos[action.key].checked = action.checked

            return {
                ...state,
                listTodos: newListTodos
            }
        }

        case actions.TOGGLE_EDITING: {
            let newListTodos = [...state.listTodos]
            newListTodos[action.key].isEditing = action.isEditing

            return {
                ...state,
                listTodos: newListTodos
            }
        }

        default: {
            throw new Error('Action invalid')
        }
    }

}

export default todoReducer