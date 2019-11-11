import React, {Component, ReactNode} from 'react';
import './App.scss';

class App extends Component {
  render(): ReactNode {
    var helloWorld = 'Welcome to the Road to learn React';
    return (
      <div className="App">
        <h2>{helloWorld}</h2>
      </div>
    );
  }
}

export default App;
