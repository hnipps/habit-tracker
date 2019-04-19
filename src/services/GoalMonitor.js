export class GoalMonitor {
  goalList;
  goalCheckInterval; // ms

  constructor(goals, goalCheckInterval) {
    this.setGoalList(goals);
    this.goalCheckInterval = goalCheckInterval;
    setInterval(() => this.checkGoals(this.goals), 10000);
  }

  setGoalList = goals => {
    this.goals = [...goals];
  };

  alertUser = ({ id }) => console.log(`Goal ${id} must be updated!`);

  checkGoals = goals =>
    goals.forEach(goal => {
      const currentDate = new Date();
      if (currentDate - goal.lastUpdated > this.goalCheckInterval) {
        this.alertUser(goal);
      }
    });
}
