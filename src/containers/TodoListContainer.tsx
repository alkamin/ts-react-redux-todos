import { connect, Dispatch } from 'react-redux';

import Todo from '../types/Todo';
import TodoList from '../components/TodoList';
import * as actions from '../actions/';
import StoreState from '../types/StoreState';

export function mapStateToProps({ todos }: StoreState) {
  return {
    todos
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.TodoAction>) {
  return {
    onTodoCreate: (todo: Todo) => dispatch(actions.createTodo(todo)),
    onTodoEdit: (todo: Todo) => dispatch(actions.editTodo(todo)),
    onTodoDelete: (todo: Todo) => dispatch(actions.deleteTodo(todo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
