import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Schedule } from '../model/schedule';
import { scheduleRouter } from '../controller/schedule.routes';
import { Workout } from '../model/workout';
import database from '../util/database';
import { secondsInDay } from 'date-fns';

const getAllSchedules = async (): Promise<Schedule[]> => {
    try {
        const schedulesPrisma = await prisma.schedule.findMany({
            include: {
                workouts: true,
            },
        });
        return schedulesPrisma.map((schedule) => Schedule.from(schedule));
    } catch (error) {
        console.error('Error fetching schedules:', error);
        throw new Error('Failed to fetch schedules');
    }
};

const getScheduleById = async (scheduleId: number): Promise<Schedule | null> => {
    try {
        const schedulePrisma = await prisma.schedule.findUnique({
            where: { id: scheduleId },
            include: {
                workouts: true,
            },
        });
        return schedulePrisma ? Schedule.from(schedulePrisma) : null;
    } catch (error) {
        console.error(`Error fetching schedule with ID ${scheduleId}:`, error);
        throw new Error(`Failed to fetch schedule with ID ${scheduleId}`);
    }
};

const addSchedule = async (schedule: Schedule): Promise<Schedule> => {
    try {
        const schedulePrisma = await database.schedule.create({
            data: {
                date: schedule.getDate(),
                calorieBurn: schedule.getCalorieBurn(),
                totalTime: schedule.getTotalTime(),
                workouts: {
                    connect: [],
                },
            },
            include: {
                workouts: true,
            },
        });
        return Schedule.from(schedulePrisma);
    } catch (error) {
        console.log('couldnt add schedule', error);
        throw new Error('Failed to create schedule');
    }
};

const addWorkoutsToSchedule = async (scheduleId: number, workoutIds: number[]) => {
    try {
        const schedule = await prisma.schedule.findUnique({ where: { id: scheduleId } });

        if (!schedule) {
            throw new Error('No schedule has been found');
        }

        console.log('Schedule ID:', scheduleId);
        console.log("Workout Id's:", workoutIds);
        console.log('Schedule found:', schedule); //validatie moet nog in de service gezet worden

        const updatedSchedulePrisma = await prisma.schedule.update({
            where: { id: scheduleId },
            data: {
                workouts: {
                    connect: workoutIds.map((id) => ({ id })),
                },
            },
            include: {
                workouts: true,
            },
        });

        console.log('the workout has been added to the schedule successfully!');
        return Schedule.from(updatedSchedulePrisma);
    } catch (error) {
        console.log('error adding the workout to the schedule');
        throw new Error('failed adding workouts to schedule');
    }
};

export default { getAllSchedules, getScheduleById, addWorkoutsToSchedule, addSchedule };
