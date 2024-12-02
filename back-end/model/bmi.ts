import { Bmi as BmiPrisma } from '@prisma/client';
export class Bmi {
    private id?: number;
    private length: number;
    private weight: number;
    private bmiValue: number;

    constructor(bmi: { id?: number; length: number; weight: number; bmiValue: number }) {
        this.id = bmi.id;
        this.length = bmi.length;
        this.weight = bmi.weight;
        this.bmiValue = bmi.bmiValue;
    }

    static from({ id, length, weight, bmiValue}: BmiPrisma) {
        return new Bmi({ id, length, weight, bmiValue });
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

    getBmiValue(): number {
        return this.bmiValue;
    }

    equals(bmi: Bmi): boolean {
        return this.length === bmi.getLenght() && this.weight === bmi.getWeight() &&
        this.bmiValue === bmi.getBmiValue();
    }
}
