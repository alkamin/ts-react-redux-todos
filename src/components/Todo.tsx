import * as React from 'react';

import {
    Button,
    EditableText,
    Checkbox
} from '@blueprintjs/core';

import Todo from '../types/Todo';

export interface props {
    todo: Todo,
    onEdit: (todo: Todo) => void,
    onDelete: (todo: Todo) => void
}

function TodoComponent ({ todo, onEdit, onDelete }:props) {
    function toggleTodo() {
        todo.complete = !todo.complete;
        onEdit(todo);
    }
    function togglePinned() {
        todo.pinned = !todo.pinned;
        onEdit(todo);
    }
    function deleteTodo() {
        onDelete(todo);
    }
    function editContent(content: string) {
        todo.content = content;
        onEdit(todo);
    }
    function classNames() {
        if (todo.complete) {
            return 'todo-complete';
        }
        return '';
    }
    function pinnedButtonClass() {
        if (todo.pinned) {
            return 'pt-icon-unpin';
        }
        return 'pt-icon-pin';
    }
    return (
        <li className="pt-ui-text-large todo-item">
            <Checkbox checked={ todo.complete }
                      className="pt-large"
                      onChange={ toggleTodo }
            />
            <EditableText className={`todo-content ${classNames()}`}
                          defaultValue={ todo.content }
                          onConfirm={ editContent }
                          selectAllOnFocus = { true }
            />
            <Button iconName={ pinnedButtonClass() }
                    className="pt-minimal pt-large"
                    onClick={ togglePinned }
            />
            <Button iconName="pt-icon-delete"
                    className="pt-minimal pt-large"
                    onClick={ deleteTodo }
            />
        </li>
    );
};

export default TodoComponent;
