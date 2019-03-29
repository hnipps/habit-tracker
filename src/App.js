import React, { Component } from 'react';
import './App.css';
import { Goal } from './components/goal/Goal';
import { GoalList } from './components/goal-list/GoalList';

import { Button } from './components/button/Button';

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

  handleGoalEdit = goalId => key => event => {
    const { goals: currGoals } = this.state;
    const currIndex = currGoals.findIndex(goal => goal.id === goalId);
    const oldGoal = currGoals[currIndex];
    const newGoals = [...currGoals].fill(
      { ...oldGoal, [key]: event.target.value },
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
    const newGoals = [...currGoals, { id: newId, text: '', dueDate: '' }];
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
