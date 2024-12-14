import { PrismaClient } from '@prisma/client';
import { Bmi } from '../model/bmi';

const prisma = new PrismaClient();

const addBmi = async (data: { bmiValue: number }): Promise<Bmi> => {
    const bmiPrisma = await prisma.bmi.create({
        data: {
            bmiValue: data.bmiValue,
            length: 0,
            weight: 0,
        },
    });

    return Bmi.from(bmiPrisma);
};

const getAllBmi = async () => {
    try {
        const bmiPrisma = await prisma.bmi.findMany({
            include: {
                users: true,
            },
        });

        return bmiPrisma.map((bmi) => Bmi.from(bmi));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch bmi's");
    }
};

const getBmiByValue = async (bmiValue: number): Promise<Bmi | null> => {
    const bmiPrisma = await prisma.bmi.findFirst({
        where: {
            bmiValue: bmiValue,
        },
        include: {
            users: true,
        },
    });

    return bmiPrisma ? Bmi.from(bmiPrisma) : null;
};

const addUserToBmi = async (bmiId: number, userId: number) => {
    if (!bmiId) {
        throw new Error('Invalid BMI ID');
    }

    await prisma.bmi.update({
        where: { id: bmiId },
        data: {
            users: {
                connect: { id: userId },
            },
        },
    });
};

const updateBmi = async (userId: number, bmiValue: number): Promise<Bmi> => {
    const existingBmi = await getBmiByValue(bmiValue);

    if (existingBmi) {
        const bmiId = existingBmi.getId();
        if (typeof bmiId !== 'number' || isNaN(bmiId)) {
            throw new Error('BMI ID is invalid');
        }

        await addUserToBmi(bmiId, userId);
        return existingBmi;
    } else {
        const newBmi = await addBmi({ bmiValue });

        const newBmiId = newBmi.getId();
        if (typeof newBmiId !== 'number' || isNaN(newBmiId)) {
            throw new Error('New BMI creation failed, invalid ID');
        }

        await addUserToBmi(newBmiId, userId);
        return newBmi;
    }
};

const bmiService = {
    addBmi,
    getAllBmi,
    getBmiByValue,
    addUserToBmi,
    updateBmi,
};

export default bmiService;
