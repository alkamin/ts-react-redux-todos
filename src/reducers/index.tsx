import { TodoAction } from '../actions';
import StoreState from '../types/StoreState';
import {
    CREATE_TODO,
    EDIT_TODO,
    DELETE_TODO
} from '../constants/index';

export function todo(state: StoreState, action: TodoAction): StoreState {
    switch (action.type) {
        case CREATE_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            };
        case EDIT_TODO:
            const i = state.todos.findIndex(t => t.createdAt === action.todo.createdAt);
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, i),
                    action.todo,
                    ...state.todos.slice(i + 1, state.todos.length)
                ]
            };
        case DELETE_TODO:
            const j = state.todos.findIndex(t => t.createdAt === action.todo.createdAt);
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, j),
                    ...state.todos.slice(j + 1, state.todos.length)
                ]
            };
        default:
            return state;
    }
}
