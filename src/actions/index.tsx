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

export type TodoAction =
    CreateTodo |
    EditTodo |
    DeleteTodo

export function createTodo(todo:Todo): CreateTodo {
    return {
        type: constants.CREATE_TODO,
        todo
    };
}

export function editTodo(todo:Todo): EditTodo {
    return {
        type: constants.EDIT_TODO,
        todo
    };
}

export function deleteTodo(todo:Todo): DeleteTodo {
    return {
        type: constants.DELETE_TODO,
        todo
    };
}
