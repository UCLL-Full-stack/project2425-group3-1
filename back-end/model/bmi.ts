import { Bmi as BmiPrisma } from '@prisma/client';
export class Bmi {
    private id?: number;
    private length: number;
    private weight: number;

    constructor(bmi: { id?: number; length: number; weight: number }) {
        this.id = bmi.id;
        this.length = bmi.length;
        this.weight = bmi.weight;
    }

    static from({ id, length, weight }: BmiPrisma) {
        return new Bmi({ id, length, weight });
    }

    getId(): number | undefined {
        return this.id;
    }

    getLenght(): number {
        return this.length;
    }

    getWeight(): number {
        return this.weight;
    }

    equals(bmi: Bmi): boolean {
        return this.length === bmi.getLenght() && this.weight === bmi.getWeight();
    }
}
