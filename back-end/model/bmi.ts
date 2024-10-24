export class Bmi {
    private id?: number;
    private length: number;
    private weight: number;

    constructor(bmi: { id?: number; length: number; weigth: number }) {
        this.id = bmi.id;
        this.length = bmi.length;
        this.weight = bmi.weigth;
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
