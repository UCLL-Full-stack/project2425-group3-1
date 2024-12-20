import { Workout as WorkoutPrisma } from '@prisma/client';

export class Workout {
    private id?: number;
    private location: string;
    private level: number;
    private time: number;
    private name: string;
    private calorie: number;
    private muscle: string;
    private muscleImage: string;

    constructor(workout: {
        location: string;
        level: number;
        time: number;
        name: string;
        calorie: number;
        muscle: string;
        id?: number;
        muscleImage: string;
    }) {
        this.validate(workout); 
        this.id = workout.id;
        this.location = workout.location;
        this.level = workout.level;
        this.time = workout.time;
        this.name = workout.name;
        this.calorie = workout.calorie;
        this.muscle = workout.muscle;
        this.muscleImage = workout.muscleImage;
    }

    static from({
        id,
        location,
        level,
        time,
        name,
        calorie,
        muscle,
        muscleImage,
    }: WorkoutPrisma) {
        return new Workout({
            id,
            location,
            level,
            time,
            name,
            calorie,
            muscle,
            muscleImage,
        });
    }


    getId(): number | undefined {
        return this.id;
    }

    getLocation(): string {
        return this.location;
    }

    getName(): string {
        return this.name;
    }

    getMuscle(): string {
        return this.muscle;
    }

    getLevel(): number {
        return this.level;
    }

    getTime(): number {
        return this.time;
    }

    getCalorie(): number {
        return this.calorie;
    }


    private validate(workout: {
        location: string;
        level: number;
        time: number;
        name: string;
        calorie: number;
        muscle: string;
        id?: number;
        muscleImage: string;
    }): void {
 
        if (!workout.location || workout.location.trim().length === 0) {
            throw new Error('Location is required.');
        }

        if (workout.level < 1 || workout.level > 5) {
            throw new Error('Level must be between 1 and 5.');
        }

        if (workout.time <= 0) {
            throw new Error('Time must be greater than zero.');
        }

        if (!workout.name || workout.name.trim().length === 0) {
            throw new Error('Name is required.');
        }

        if (workout.calorie <= 0) {
            throw new Error('Calorie count must be greater than zero.');
        }

        if (!workout.muscle || workout.muscle.trim().length === 0) {
            throw new Error('Muscle is required.');
        }
    }

    equals(workout: Workout): boolean {
        return (
            this.id === workout.getId() &&
            this.location === workout.getLocation() &&
            this.level === workout.getLevel() &&
            this.time === workout.getTime() &&
            this.name === workout.getName() &&
            this.calorie === workout.getCalorie() &&
            this.muscle === workout.getMuscle()
        );
    }
}
