import { Bmi as BmiPrisma } from '@prisma/client';

export class Bmi {
    private id?: number;
    private length: number;
    private weight: number;
    private bmiValue: number;

    constructor(bmi: { id?: number; length: number; weight: number; bmiValue: number }) {
        this.validate(bmi); 
        this.id = bmi.id;
        this.length = bmi.length;
        this.weight = bmi.weight;
        this.bmiValue = bmi.bmiValue;
    }

    static from({ id, length, weight, bmiValue }: BmiPrisma) {
        return new Bmi({ id, length, weight, bmiValue });
    }


    getId(): number | undefined {
        return this.id;
    }

    getLength(): number {
        return this.length;
    }

    getWeight(): number {
        return this.weight;
    }

    getBmiValue(): number {
        return this.bmiValue;
    }


    private validate(bmi: { id?: number; length: number; weight: number; bmiValue: number }): void {
        if (!bmi.length || bmi.length <= 0) {
            throw new Error('Length must be positive.');
        }

        if (!bmi.weight || bmi.weight <= 0) {
            throw new Error('Weight must be positive.');
        }

        if (!bmi.bmiValue || bmi.bmiValue <= 0) {
            throw new Error('BMI value must be a positive number.');
        }
    }

 
    equals(bmi: Bmi): boolean {
        return (
            this.length === bmi.getLength() &&
            this.weight === bmi.getWeight() &&
            this.bmiValue === bmi.getBmiValue()
        );
    }
}
