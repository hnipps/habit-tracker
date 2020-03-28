import React, { Component } from 'react';
import './App.css';
import { Goal } from './components/goal/Goal';
import { GoalList } from './components/goal-list/GoalList';

import { Button } from './components/button/Button';

import { GoalMonitor } from './services/GoalMonitor';
import { Dialog } from './components/dialog/Dialog';

const goals = [
  {
    id: '1',
    text: 'Climb Everest',
    dueDate: new Date(2019, 8, 19),
    lastUpdated: new Date(2019, 1, 1)
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
  goalMonitor;

  constructor(props) {
    super(props);
    this.state = {
      goals,
      showDialog: undefined
    };
    this.goalMonitor = new GoalMonitor(this.state.goals, 3600000);
    this.goalMonitor.alertUserSource$.subscribe(id => {
      console.log('check', id);
      this.showDialog(id);
    });
  }

  updateGoalMonitor = newGoals => this.goalMonitor.setGoalList(newGoals);

  findGoal = id => {
    const { goals } = this.state;
    return goals.find(goal => goal.id === id);
  };

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
    this.updateGoalMonitor(newGoals);
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
    this.updateGoalMonitor(newGoals);
  };

  deleteGoal = goalId => () => {
    const { goals: currGoals } = this.state;
    const newGoals = currGoals.filter(goal => goal.id !== goalId);
    this.setState({
      goals: [...newGoals]
    });
    this.updateGoalMonitor(newGoals);
  };

  resetGoalTimer = id => () => {
    const { goals: currGoals } = this.state;
    const currIndex = currGoals.findIndex(goal => goal.id === id);
    const oldGoal = currGoals[currIndex];
    const newGoals = [...currGoals].fill(
      { ...oldGoal, lastUpdated: new Date() },
      currIndex,
      currIndex + 1
    );
    this.setState({
      goals: [...newGoals]
    });
    this.updateGoalMonitor(newGoals);
  };

  showDialog = id =>
    this.setState(prevState => ({ ...prevState, showDialog: id }));

  closeDialog = () =>
    this.setState(prevState => ({ ...prevState, showDialog: undefined }));

  render() {
    const { showDialog } = this.state;
    let goal;
    if (showDialog) {
      goal = this.findGoal(showDialog);
    }
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
        {showDialog && (
          <Dialog>
            <p>Do you still care about this goal?</p>
            <p>{goal.text}</p>
            <div>
              <Button
                className="mr2"
                onClick={() => {
                  this.resetGoalTimer(goal.id);
                  this.closeDialog();
                }}
              >
                Keep
              </Button>
              <Button
                onClick={() => {
                  this.deleteGoal(goal.id);
                  this.closeDialog();
                }}
              >
                Delete
              </Button>
            </div>
          </Dialog>
        )}
      </>
    );
  }
}

export default App;
