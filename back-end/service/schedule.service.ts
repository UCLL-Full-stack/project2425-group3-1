import { PrismaClient, Schedule, Workout } from '@prisma/client'; 
const prisma = new PrismaClient();


const getAllSchedules = async (): Promise<Schedule[]> => {
    try {
        const schedules = await prisma.schedule.findMany({
            include: {
                workouts: true, 
            },
        });
        return schedules;
    } catch (error) {
        console.error("Error fetching schedules:", error);
        throw new Error("Failed to fetch schedules");
    }
};


const getScheduleById = async (scheduleId: number): Promise<Schedule | null> => {
    try {
        const schedule = await prisma.schedule.findUnique({
            where: { id: scheduleId },
            include: {
                workouts: true, 
            },
        });
        return schedule;
    } catch (error) {
        console.error(`Error fetching schedule with ID ${scheduleId}:`, error);
        throw new Error(`Failed to fetch schedule with ID ${scheduleId}`);
    }
};


const addWorkoutsToSchedule = async (scheduleId: number, workouts: Workout[]): Promise<Schedule> => {
    try {
        const schedule = await prisma.schedule.findUnique({
            where: { id: scheduleId },
        });

        if (!schedule) {
            throw new Error(`No schedule found with ID ${scheduleId}`);
        }

  
        const updatedSchedule = await prisma.schedule.update({
            where: { id: scheduleId },
            data: {
                workouts: {
                    connect: workouts.map((workout) => ({ id: workout.id })), 
                },
            },
            include: {
                workouts: true, 
            },
        });

        return updatedSchedule;
    } catch (error) {
        console.error(`Error adding workouts to schedule with ID ${scheduleId}:`, error);
        throw new Error(`Failed to add workouts to schedule with ID ${scheduleId}`);
    }
};

export default { getAllSchedules, getScheduleById, addWorkoutsToSchedule };
