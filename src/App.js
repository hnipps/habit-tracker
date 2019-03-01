import React, { Component } from 'react';
import './App.css';
import { Goal } from './components/goal/Goal';
import { GoalList } from './components/goal-list/GoalList';

class App extends Component {
  render() {
    return (
      <div className="pa2">
        <GoalList>
          <Goal text="Climb Everest" dueDate="09/19/2019" />
          <Goal text="Swim with sharks" dueDate="01/01/2020" />
          <Goal text="Learn to juggle" dueDate="07/21/2019" />
        </GoalList>
      </div>
    );
  }
}

export default App;
