import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.schedule.deleteMany();
    await prisma.workout.deleteMany();
    await prisma.bmi.deleteMany();
    await prisma.goal.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    const profile1 = await prisma.profile.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
        },
    });

    const bmi1 = await prisma.bmi.create({
        data: {
            length: 1.75,
            weight: 70,
            bmiValue: 19,
        },
    });

    const goal1 = await prisma.goal.create({
        data: {
            goalType: 'Lose Weight',
        },
    });

    const workout1 = await prisma.workout.create({
        data: {
            location: 'Gym',
            level: 2,
            time: 30,
            name: 'Full Body Strength',
            calorie: 300,
            muscle: 'Arms, Legs, Core',
            muscleImage: '/images/homepagepic.png',
        },
    });

    const workout2 = await prisma.workout.create({
        data: {
            location: 'Home',
            level: 1,
            time: 15,
            name: 'Quick Cardio Blast',
            calorie: 150,
            muscle: 'Cardio',
            muscleImage: '/images/homepagepic.png',
        },
    });

    const workout3 = await prisma.workout.create({
        data: {
            location: 'Gym',
            level: 3,
            time: 45,
            name: 'Leg Day Intensive',
            calorie: 500,
            muscle: 'Legs',
            muscleImage: '/images/homepagepic.png',
        },
    });

    const workout4 = await prisma.workout.create({
        data: {
            location: 'Home',
            level: 1,
            time: 20,
            name: 'Basic core',
            calorie: 150,
            muscle: 'Core Muscles',
            muscleImage: '/images/homepagepic.png',
        },
    });

    const workout5 = await prisma.workout.create({
        data: {
            location: 'Outside',
            level: 5,
            time: 120,
            name: 'Interval run',
            calorie: 600,
            muscle: 'Legs/cardio',
            muscleImage: '/images/homepagepic.png',
        },
    });

    const schedule1 = await prisma.schedule.create({
        data: {
            date: new Date('2024-12-01'),
            calorieBurn: 450,
            totalTime: 75,
            workouts: {
                connect: [{ id: workout1.id }, { id: workout2.id }],
            },
        },
    });

    const schedule2 = await prisma.schedule.create({
        data: {
            date: new Date('2024-12-15'),
            calorieBurn: 500,
            totalTime: 60,
            workouts: {
                connect: [{ id: workout3.id }],
            },
        },
    });

    console.log('Seeding voltooid!');
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error('Seeding mislukt:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
