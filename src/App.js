import React, { Component } from 'react';
import './App.css';
import { Goal } from './components/goal/Goal';
import { GoalList } from './components/goal-list/GoalList';

import { environmentVariables } from './css-env-variables';

const goals = [
  { id: '1', text: 'Climb Everest', dueDate: '09/19/2019' },
  { id: '2', text: 'Swim with sharks', dueDate: '01/01/2020' },
  { id: '3', text: 'Learn to juggle', dueDate: '07/21/2019' }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals
    };
  }

  handleGoalEdit = goalId => event => {
    const { goals: currGoals } = this.state;
    const currIndex = currGoals.findIndex(goal => goal.id === goalId);
    const oldGoal = currGoals[currIndex];
    const newGoals = [...currGoals].fill(
      { ...oldGoal, text: event.target.value },
      currIndex,
      currIndex + 1
    );
    this.setState({
      goals: [...newGoals]
    });
  };

  render() {
    console.log(environmentVariables);

    return (
      <>
        <header className="app-header h2 ph2 pv2 bg-light-gray helvetica">
          Track your goals
        </header>
        <div className="pa2">
          <GoalList>
            {this.state.goals.map((goal, i) => (
              <Goal
                id={`goal-${i}`}
                goal={goal}
                onEdit={this.handleGoalEdit(goal.id)}
              />
            ))}
          </GoalList>
        </div>
      </>
    );
  }
}

export default App;
