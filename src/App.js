import React, { Component } from 'react';
import './App.css';
import { Goal } from './components/goal/Goal';
import { GoalList } from './components/goal-list/GoalList';

import { environmentVariables } from './css-env-variables';

class App extends Component {
  render() {
    console.log(environmentVariables);

    return (
      <>
        <header className="app-header h2 ph2 pv2 bg-light-gray helvetica">
          Track your goals
        </header>
        <div className="pa2">
          <GoalList>
            <Goal text="Climb Everest" dueDate="09/19/2019" />
            <Goal text="Swim with sharks" dueDate="01/01/2020" />
            <Goal text="Learn to juggle" dueDate="07/21/2019" />
          </GoalList>
        </div>
      </>
    );
  }
}

export default App;
