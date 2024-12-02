import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addBmi = async (data: { length: number; weight: number; bmiValue: number }) => {
    return await prisma.bmi.create({
        data: {
            length: data.length,
            weight: data.weight,
            bmiValue: data.bmiValue,
        },
    });
};

const getAllBmi = async () => {
    return await prisma.bmi.findMany();
};

const bmiService = {
    addBmi,
    getAllBmi,
};

export default bmiService;
