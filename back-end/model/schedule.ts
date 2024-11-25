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
        this.date = schedule.date;
        this.calorieBurn = schedule.calorieBurn;
        this.totalTime = schedule.totalTime;
        this.id = schedule.id;
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
