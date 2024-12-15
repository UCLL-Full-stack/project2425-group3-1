import scheduleDb from '../repository/schedule.db';
import { Schedule } from '../model/schedule';
import { ScheduleInput } from '../types';
import { isBooleanObject } from 'util/types';
import { SecureClientSessionOptions } from 'http2';

const getAllSchedules = async (): Promise<Schedule[]> => {
    return scheduleDb.getAllSchedules();
};

const deleteSchedule = async (scheduleId: number): Promise<Schedule | null> => {
    if (scheduleId === null) {
        throw new Error(`The schedule ID ${scheduleId} does not exist`);
    }
    if (scheduleId <= 0) {
        throw new Error(`${scheduleId} Is not a valid ID`);
    }

    return await scheduleDb.deleteSchedule(scheduleId);
};

const addSchedule = async (scheduleInput: ScheduleInput): Promise<Schedule> => {
    const date = new Date(scheduleInput.date);
    const schedule = new Schedule({
        date: date,
        calorieBurn: scheduleInput.calorieBurn,
        totalTime: scheduleInput.totalTime,
        workouts: [],
    });
    return await scheduleDb.addSchedule(schedule);
};

const addWorkoutsToSchedule = async (scheduleId: number, workoutIds: number[]) =>
    scheduleDb.addWorkoutsToSchedule(scheduleId, workoutIds);

const getScheduleById = async (scheduleId: number): Promise<Schedule | null> => {
    if (scheduleId === null || scheduleId === undefined) {
        console.log(`could not find a schedule with id ${scheduleId}`);
        throw new Error('There is no schedule with this ID');
    }

    if (isNaN(scheduleId)) {
        console.log('Invalid schedule id', scheduleId);
        throw new Error(`Invalid schedule ID`);
    }

    if (!Schedule) {
        console.log('No schedule was found with id', scheduleId);
        throw new Error(`No schedule found with ID ${scheduleId}`);
    }
    return await scheduleDb.getScheduleById(scheduleId);
};

export default {
    getAllSchedules,
    getScheduleById,
    addWorkoutsToSchedule,
    addSchedule,
    deleteSchedule,
};
