import { Bmi as BmiPrisma, User } from '@prisma/client';

export class Bmi {
    private id?: number;
    private length?: number;
    private weight?: number;
    private bmiValue: number;
    private users: User[] = [];

    constructor(bmi: {
        id?: number;
        length: number;
        weight: number;
        bmiValue: number;
        users?: User[];
    }) {
        this.validate(bmi);
        this.id = bmi.id;
        this.length = bmi.length;
        this.weight = bmi.weight;
        this.bmiValue = bmi.bmiValue;
        this.users = bmi.users || [];
    }

    updateBmiValue(newBmiValue: number) {
        this.bmiValue = newBmiValue;
    }

    static from({ id, length, weight, bmiValue, users }: BmiPrisma & { users?: User[] }): Bmi {
        return new Bmi({ id, length, weight, bmiValue, users });
    }

    getId(): number | undefined {
        return this.id;
    }

    getLength(): number | undefined {
        return this.length;
    }

    getWeight(): number | undefined {
        return this.weight;
    }
    getBmiValue(): number {
        return this.bmiValue;
    }

    getUsers(): User[] {
        return this.users;
    }

    addUser(user: User): void {
        if (!user) {
            throw new Error('User cannot be null or undefined.');
        }
        this.users.push(user);
    }

    private validate(bmi: {
        id?: number;
        length?: number;
        weight?: number;
        bmiValue: number;
        users?: User[];
    }): void {
        if (!bmi.bmiValue || bmi.bmiValue <= 0) {
            throw new Error('BMI value must be a positive number.');
        }
    }

    equals(bmi: Bmi): boolean {
        return (
            this.length === bmi.getLength() &&
            this.weight === bmi.getWeight() &&
            this.bmiValue === bmi.getBmiValue() &&
            this.users.length === bmi.getUsers().length &&
            this.users.every((user) => bmi.getUsers().some((u) => u.id === user.id))
        );
    }
}
