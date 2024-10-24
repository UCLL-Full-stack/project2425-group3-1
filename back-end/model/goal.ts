export class Goal {
    private id?: number;
    private goalType: string;

    constructor(goal: { id?: number; goalType: string }) {
        this.goalType = goal.goalType;
    }

    getId(): number | undefined {
        return this.id;
    }

    getGoalType(): string {
        return this.goalType;
    }

    equals(goal: Goal): boolean {
        return this.goalType === goal.getGoalType();
    }
}
