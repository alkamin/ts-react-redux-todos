import * as constants from '../constants';
import Todo from '../types/Todo';

export interface CreateTodo {
    type: constants.CREATE_TODO;
    todo: Todo;
}

export interface EditTodo {
    type: constants.EDIT_TODO;
    todo: Todo;
}

export interface DeleteTodo {
    type: constants.DELETE_TODO;
    todo: Todo;
}

export interface DeleteCompleteTodos {
    type: constants.DELETE_COMPLETE_TODOS;
}

export type TodoAction =
    CreateTodo |
    EditTodo |
    DeleteTodo |
    DeleteCompleteTodos;

export function createTodo(todo: Todo): CreateTodo {
    return {
        type: constants.CREATE_TODO,
        todo
    };
}

export function editTodo(todo: Todo): EditTodo {
    return {
        type: constants.EDIT_TODO,
        todo
    };
}

export function deleteTodo(todo: Todo): DeleteTodo {
    return {
        type: constants.DELETE_TODO,
        todo
    };
}

export function deleteCompleteTodos(): DeleteCompleteTodos {
    return {
        type: constants.DELETE_COMPLETE_TODOS
    };
}
