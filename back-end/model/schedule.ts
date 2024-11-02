// Schedule.ts
import { Workout } from './workout'; // Adjust the path as necessary

export class Schedule {
    private id?: number;
    private date: Date;
    private calorieBurn: number;
    private totalTime: number;
    private workouts: Workout[]; 

    constructor(schedule: {
        date: Date;
        calorieBurn: number;
        totalTime: number;
        id?: number;
        workouts?: Workout[]; 
    }) {
        this.date = schedule.date;
        this.calorieBurn = schedule.calorieBurn;
        this.totalTime = schedule.totalTime;
        this.id = schedule.id;
        this.workouts = schedule.workouts || []; 
    }

    getId(): number | undefined {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getCalorieBurn(): number {
        return this.calorieBurn;
    }

    getTotalTime(): number {
        return this.totalTime;
    }

    getWorkouts(): Workout[] {
        return this.workouts; // Getter for workouts
    }

    addWorkout(workout: Workout): void {
        this.workouts.push(workout); // Add a workout to the list
    }

    equals(schedule: Schedule): boolean {
        return (
            this.id === schedule.getId() &&
            this.date.getTime() === schedule.getDate().getTime() &&
            this.calorieBurn === schedule.getCalorieBurn() &&
            this.totalTime === schedule.getTotalTime() &&
            this.workouts.length === schedule.getWorkouts().length && // Compare workout lengths
            this.workouts.every((workout, index) => workout.getId() === schedule.getWorkouts()[index].getId()) // Compare workouts
        );
    }
}
