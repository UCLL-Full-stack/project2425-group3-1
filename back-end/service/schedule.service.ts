import scheduleDb from '../repository/schedule.db';
import { Schedule } from '../model/schedule';
import { ScheduleInput } from '../types';

const getAllSchedules = async (): Promise<Schedule[]> => {
    return scheduleDb.getAllSchedules();
};

const getScheduleById = async (scheduleId: number): Promise<Schedule | null> =>
    scheduleDb.getScheduleById(scheduleId);

const addSchedule = async (scheduleInput: ScheduleInput): Promise<Schedule> => {
    const schedule = new Schedule({
        date: scheduleInput.date,
        calorieBurn: scheduleInput.calorieBurn,
        totalTime: scheduleInput.totalTime,
        workouts: [],
    });
    return await scheduleDb.addSchedule(schedule);
};

const addWorkoutsToSchedule = async (scheduleId: number, workoutIds: number[]) =>
    scheduleDb.addWorkoutsToSchedule(scheduleId, workoutIds);

export default { getAllSchedules, getScheduleById, addWorkoutsToSchedule, addSchedule };
