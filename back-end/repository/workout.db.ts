import { PrismaClient, Workout } from '@prisma/client'; 
const prisma = new PrismaClient();


const getAllWorkouts = async (): Promise<Workout[]> => {
    try {
        const workouts = await prisma.workout.findMany(); 
        return workouts;
    } catch (error) {
        console.error("Error fetching workouts:", error);
        throw new Error("Failed to fetch workouts");
    }
};

export default { getAllWorkouts };