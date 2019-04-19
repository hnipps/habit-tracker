import React, { Component } from 'react';
import './App.css';
import { Goal } from './components/goal/Goal';
import { GoalList } from './components/goal-list/GoalList';

import { Button } from './components/button/Button';

import { GoalMonitor } from './services/GoalMonitor';

const goals = [
  {
    id: '1',
    text: 'Climb Everest',
    dueDate: new Date(2019, 8, 19),
    lastUpdated: new Date()
  },
  {
    id: '2',
    text: 'Swim with sharks',
    dueDate: new Date(2020, 0, 1),
    lastUpdated: new Date()
  },
  {
    id: '3',
    text: 'Learn to juggle',
    dueDate: new Date(2019, 6, 21),
    lastUpdated: new Date()
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals
    };
    new GoalMonitor(this.state.goals, 1000);
  }

  handleGoalEdit = goalId => (key, modifierCallback) => returnedValue => {
    const { goals: currGoals } = this.state;
    const currIndex = currGoals.findIndex(goal => goal.id === goalId);
    const oldGoal = currGoals[currIndex];
    const modifiedValue = modifierCallback
      ? modifierCallback(returnedValue)
      : returnedValue;
    const newGoals = [...currGoals].fill(
      { ...oldGoal, [key]: modifiedValue, lastUpdated: new Date() },
      currIndex,
      currIndex + 1
    );
    this.setState({
      goals: [...newGoals]
    });
  };

  addNewGoal = () => {
    const { goals: currGoals } = this.state;
    const newId = currGoals.length;
    const newGoals = [
      ...currGoals,
      { id: newId, text: '', dueDate: '', lastUpdated: new Date() }
    ];
    this.setState({
      goals: [...newGoals]
    });
  };

  deleteGoal = goalId => () => {
    const { goals: currGoals } = this.state;
    const newGoals = currGoals.filter(goal => goal.id !== goalId);
    this.setState({
      goals: [...newGoals]
    });
  };

  render() {
    return (
      <>
        <header className="app-header h2 ph2 pv2 bg-light-gray helvetica">
          Track your goals
          <Button onClick={this.addNewGoal}>New Goal</Button>
        </header>
        <div className="pa2">
          <GoalList>
            {this.state.goals.map(({ id, ...props }, i) => (
              <Goal
                key={i}
                id={`goal-${i}`}
                onEdit={this.handleGoalEdit(id)}
                onDelete={this.deleteGoal(id)}
                {...props}
              />
            ))}
          </GoalList>
        </div>
      </>
    );
  }
}

export default App;
