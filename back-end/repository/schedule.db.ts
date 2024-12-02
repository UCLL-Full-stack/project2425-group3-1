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
        console.error('Error fetching schedules:', error);
        throw new Error('Failed to fetch schedules');
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

const addWorkoutsToSchedule = async (scheduleId: number, workoutIds: number[]) => {
    try {
        const schedule = await prisma.schedule.findUnique({ where: { id: scheduleId } });

        if (!schedule) {
            throw new Error('No schedule has been found');
        }

        //basic debug logs van de dingen die we toevoegen/selecteren
        console.log('Schedule ID:', scheduleId);
        console.log("Workout Id's:", workoutIds);
        console.log('Schedule found:', schedule);

        //de workouts in de database loggen
        // const workouts = await prisma.workout.findMany();
        // console.log('All workouts in DB:', workouts);

        await prisma.schedule.update({
            where: { id: scheduleId },
            data: {
                workouts: {
                    connect: workoutIds.map((id) => ({ id })),
                },
            },
        });

        return { message: 'the workout has been added to the schedule successfully!' };
    } catch (error) {
        console.log('error adding the workout to the schedule');
        throw new Error('failed adding workouts to schedule');
    }
};

export default { getAllSchedules, getScheduleById, addWorkoutsToSchedule };
