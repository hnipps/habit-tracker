import { Subject } from 'rxjs';

export class GoalMonitor {
  goalList;
  goalCheckInterval; // ms
  alertUserSource;
  alertUserSource$;
  interval;

  constructor(goals, goalCheckInterval) {
    this.setGoalList(goals);
    this.goalCheckInterval = goalCheckInterval;
    this.alertUserSource = new Subject();
    this.alertUserSource$ = this.alertUserSource.asObservable();
  }

  setGoalList = goals => {
    this.goals = [...goals];
    this.cancelInterval();
    this.setInterval();
  };

  alertUser = ({ id }) => this.alertUserSource.next(id);

  checkGoals = goals =>
    goals.forEach(goal => {
      const currentDate = new Date();
      if (currentDate - goal.lastUpdated > this.goalCheckInterval) {
        this.alertUser(goal);
      }
    });

  setInterval = () =>
    (this.interval = setInterval(() => this.checkGoals(this.goals), 5000));

  cancelInterval = () => clearInterval(this.interval);
}
