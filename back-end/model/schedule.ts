import { Workout } from './workout';
import { Schedule as SchedulePrisma, Workout as WorkoutPrisma } from '@prisma/client';

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
        workouts: Workout[];
    }) {
        this.validate(schedule); 
        this.id = schedule.id;
        this.date = schedule.date;
        this.calorieBurn = schedule.calorieBurn;
        this.totalTime = schedule.totalTime;
        this.workouts = schedule.workouts;
    }

    static from({
        id,
        date,
        calorieBurn,
        totalTime,
        workouts,
    }: SchedulePrisma & { workouts: WorkoutPrisma[] }) {
        return new Schedule({
            id,
            date,
            calorieBurn,
            totalTime,
            workouts: workouts.map((workout) => Workout.from(workout)),
        });
    }

    addWorkoutToSchedule(workout: Workout): void {
        this.workouts.push(workout);
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
        return this.workouts;
    }

    private validate(schedule: {
        date: Date;
        calorieBurn: number;
        totalTime: number;
        id?: number;
        workouts: Workout[];
    }): void {
 
        if (!schedule.date || isNaN(schedule.date.getTime())) {
            throw new Error('A valid date is required.');
        }

        if (schedule.calorieBurn <= 0) {
            throw new Error('Calorie burn must be above zero.');
        }

        if (schedule.totalTime <= 0) {
            throw new Error('Total time must b above zero.');
        }
    }

    equals(schedule: Schedule): boolean {
        return (
            this.id === schedule.getId() &&
            this.date.getTime() === schedule.getDate().getTime() &&
            this.calorieBurn === schedule.getCalorieBurn() &&
            this.totalTime === schedule.getTotalTime() &&
            this.workouts.every((workout, index) => workout.equals(schedule.getWorkouts()[index]))
        );
    }
}
