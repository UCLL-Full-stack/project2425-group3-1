import scheduleDb from '../repository/schedule.db';
import { Schedule } from '../model/schedule';
import { ScheduleInput } from '../types';

const getAllSchedules = async (): Promise<Schedule[]> => {
    return scheduleDb.getAllSchedules();
};

const getScheduleById = async (scheduleId: number): Promise<Schedule | null> =>
    scheduleDb.getScheduleById(scheduleId);

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

export default {
    getAllSchedules,
    getScheduleById,
    addWorkoutsToSchedule,
    addSchedule,
    deleteSchedule,
};
