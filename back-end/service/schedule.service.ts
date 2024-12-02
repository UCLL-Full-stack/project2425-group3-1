import scheduleDb from '../repository/schedule.db';
import { Schedule } from '@prisma/client';

const getAllSchedules = async (): Promise<Schedule[]> => scheduleDb.getAllSchedules();

const getScheduleById = async (scheduleId: number): Promise<Schedule | null> =>
    scheduleDb.getScheduleById(scheduleId);

const addWorkoutsToSchedule = async (scheduleId: number, workoutIds: number[]) =>
    scheduleDb.addWorkoutsToSchedule(scheduleId, workoutIds);

export default { getAllSchedules, getScheduleById, addWorkoutsToSchedule };
