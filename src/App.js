import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Goal } from './components/goal/Goal';

class App extends Component {
  render() {
    return (
      <div className="pa2">
        <Goal text="Climb Everest" dueDate="09/19/2019" />
      </div>
    );
  }
}

export default App;
