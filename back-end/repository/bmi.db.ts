import { PrismaClient } from '@prisma/client';
import { Schedule } from '../model/schedule';
import { Bmi } from '../model/bmi';

const prisma = new PrismaClient();

const addBmi = async (data: { length: number; weight: number; bmiValue: number }) => {
    const bmiPrisma = await prisma.bmi.create({
        data: {
            length: data.length,
            weight: data.weight,
            bmiValue: data.bmiValue,
        },
    });

    return Bmi.from(bmiPrisma);
};

const getAllBmi = async () => {
    try {
        const bmiPrisma = await prisma.bmi.findMany();
        return bmiPrisma.map((bmi) => Bmi.from(bmi));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch bmi's");
    }
};

const bmiService = {
    addBmi,
    getAllBmi,
};

export default bmiService;
