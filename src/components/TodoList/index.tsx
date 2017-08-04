import * as React from 'react';

import {
    Button,
    NonIdealState,
    Tag
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
    onTodoDelete: (todo: Todo) => actions.TodoAction,
    onDeleteCompleteTodos: () => actions.TodoAction
}

export default function TodoList ({
    todos, onTodoEdit, onTodoCreate, onTodoDelete, onDeleteCompleteTodos
}:props) {
    function createEmptyTodo() {
        const timestamp = Date.now();
        const todo = {
            content: '',
            createdAt: timestamp,
            complete: false,
            pinned: false
        };
        onTodoCreate(todo);
    }
    function deleteCompleteTodos() {
        onDeleteCompleteTodos();
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
                className="empty-list-placeholder"
                description={`There aren't any ${name} todos yet`}
            />
        )
    }

    function countTodos(predicate: (t:Todo) => boolean) {
        return todos.filter(predicate).length;
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
                <Button
                    iconName="delete"
                    className="pt-intent-danger"
                    text="Remove complete todos"
                    onClick={deleteCompleteTodos}
                />
                <NewTodoButton
                    onClick={createEmptyTodo}
                />
            </div>
            <div className="todo-list-header">
                <Tag className="pt-minimal">
                    {countTodos(t => t.pinned)}
                </Tag>
                <h6>Pinned Todos</h6>
            </div>
            <ul className="todo-list pt-card pt-elevation-2">
                {renderTodos(t => t.pinned, 'pinned')}
            </ul>
            <div className="todo-list-header">
                <Tag className="pt-minimal">
                    {countTodos(t => !t.pinned)}
                </Tag>
                <h6>Other Todos</h6>
            </div>
            <ul className="todo-list pt-card pt-elevation-1">
                {renderTodos(t => !t.pinned)}
            </ul>
        </div>
    )
}


