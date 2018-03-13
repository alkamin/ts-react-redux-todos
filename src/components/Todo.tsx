import * as React from 'react';
import { autobind } from 'core-decorators';

import {
    Button,
    Checkbox,
    EditableText,
    // Icon
} from '@blueprintjs/core';

import Todo from '../types/Todo';

export interface TodoInterface {
    todo: Todo;
    onEdit: (todo: Todo, addNew: Boolean) => void;
    onDelete: (todo: Todo) => void;
}

class TodoComponent extends React.Component<TodoInterface> {
    todo: Todo;
    onEdit: (todo: Todo, addNew: Boolean) => void;
    onDelete: (todo: Todo) => void;
    todoEditableText: EditableText | null;

    constructor({todo, onEdit, onDelete}: TodoInterface) {
        super();
        this.todo = todo;
        // Bindings to ensure proper scope on
        this.onEdit = onEdit;
        this.onDelete = onDelete;
        this.editContent = this.editContent;
    }

    componentDidMount() {
        // Focus the todo input when the component is first created (no content)
        if (this.todoEditableText && this.todo.content === '') {
            this.todoEditableText.setState({isEditing: true});
        }
    }

    @autobind
    toggleTodo() {
        this.todo.complete = !this.todo.complete;
        this.onEdit(this.todo, false);
    }

    @autobind
    togglePinned() {
        this.todo.pinned = !this.todo.pinned;
        this.onEdit(this.todo, false);
    }

    @autobind
    deleteTodo() {
        this.onDelete(this.todo);
    }

    @autobind
    editContent(content: string) {
        // If the todo starts with an empty string, we can infer
        // that we want to add a new todo after it on confirm
        if (content === '') {
            this.deleteTodo();
        } else {
            const addNew = this.todo.content === '' && this.todo.content !== content;
            this.todo.content = content;
            this.onEdit(this.todo, addNew);
        }
    }

    @autobind
    cancelEdit() {
        if (!this.todo.content) {
            this.deleteTodo();
        }
    }

    @autobind
    classNames() {
        if (this.todo.complete) {
            return 'todo-complete';
        }
        return '';
    }

    @autobind
    pinnedButtonClass() {
        if (this.todo.pinned) {
            return 'pt-icon-unpin';
        }
        return 'pt-icon-pin';
    }

    render() {
        return (
            <li className={`pt-ui-text-large todo-item ${this.classNames()}`}>
                {/* <Icon className="drag-handle" iconName="pt-icon-drag-handle-vertical"/> */}
                <Checkbox
                    checked={this.todo.complete}
                    className="pt-large"
                    onChange={this.toggleTodo}
                />
                <EditableText
                    ref={el => this.todoEditableText = el}
                    className={`todo-content`}
                    defaultValue={this.todo.content}
                    onConfirm={this.editContent}
                    selectAllOnFocus={true}
                    onCancel={this.cancelEdit}
                />
                <Button
                    iconName={this.pinnedButtonClass()}
                    className="pt-minimal pt-large"
                    onClick={this.togglePinned}
                />
                <Button
                    iconName="pt-icon-delete"
                    className="pt-minimal pt-large"
                    onClick={this.deleteTodo}
                />
            </li>
        );
    }

}

export default TodoComponent;
