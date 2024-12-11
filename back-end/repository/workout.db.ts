import { PrismaClient } from '@prisma/client';
import { Workout } from '../model/workout';
const prisma = new PrismaClient();

const getAllWorkouts = async (): Promise<Workout[]> => {
    try {
        const workoutPrisma = await prisma.workout.findMany();
        return workoutPrisma.map((workout) => Workout.from(workout));
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw new Error('Failed to fetch workouts');
    }
};

export default { getAllWorkouts };
