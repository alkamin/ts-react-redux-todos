import * as React from 'react';

import TodoListContainer from './containers/TodoListContainer';

import '@blueprintjs/core/dist/blueprint.css';

import './App.css';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app-container">
        <TodoListContainer/>
      </div>
    );
  }
}

export default App;
