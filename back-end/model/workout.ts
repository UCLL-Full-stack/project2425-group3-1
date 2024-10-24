export class Workout {
    private id?: number;
    private location: string;
    private level: number;
    private time: number;
    private name: string; 
    private calorie: number;
    private muscle: string;
 
    constructor(workout: {location: string; level: number; time: number; name: string;  calorie: number;  muscle: string; id?: number }) {
        this.id = workout.id;
        this.location = workout.location;
        this.level = workout.level;
        this.time = workout.time;
        this.name = workout.name;
        this.calorie = workout.calorie;
        this.muscle = workout.muscle;
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
