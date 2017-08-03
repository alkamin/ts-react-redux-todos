import * as React from 'react';

import {
    NonIdealState
} from '@blueprintjs/core';

import Todo from '../../types/Todo';
import TodoComponent from '../Todo';
import NewTodoButton from '../NewTodoButton';
import * as actions from '../../actions/';

import './TodoList.css';

export interface props {
    todos: Todo[],
    onTodoCreate: (todo: Todo) => actions.TodoAction,
    onTodoEdit: (todo: Todo) => actions.TodoAction,
    onTodoDelete: (todo: Todo) => actions.TodoAction
}

export default function TodoList ({ todos, onTodoEdit, onTodoCreate, onTodoDelete }:props) {
    function createEmptyTodo() {
        const timestamp = Date.now();
        const todo = {
            content: 'This is an empty todo',
            createdAt: timestamp,
            complete: false,
            pinned: false
        };
        onTodoCreate(todo);
    }
    function renderTodos(predicate: (t:Todo) => boolean, name: string = '') {
        const filteredTodos: Todo[] = todos.filter(predicate);
        if (filteredTodos.length) {
            return (
                todos.filter(predicate).map(renderTodo)
            );
        }
        return (
            <NonIdealState
                description={`There aren't any ${name} todos yet`}
            />
        )
    }
    function renderTodo(t:Todo) {
        return (
            <TodoComponent
                key={t.createdAt}
                todo={t}
                onEdit={onTodoEdit}
                onDelete={onTodoDelete}
            />
        )
    }
    if (todos.length === 0) {
        return (
                <NonIdealState
                    title="There aren't any todos yet"
                    action={<NewTodoButton onClick={ createEmptyTodo }/>}
                    visual="pt-icon-numbered-list"
                />
        )
    }
    return (
        <div>
            <div className="list-header">
                <h2></h2>
                <NewTodoButton
                    onClick={createEmptyTodo}
                />
            </div>
            <h6 className="todo-list-header">Pinned Todos</h6>
            <ul className="todo-list pt-card pt-elevation-3">
                { renderTodos(t => t.pinned, 'pinned') }
            </ul>
            <h6 className="todo-list-header">Other Todos</h6>
            <ul className="todo-list pt-card pt-elevation-2">
                { renderTodos(t => !t.pinned) }
            </ul>
        </div>
    )
}


