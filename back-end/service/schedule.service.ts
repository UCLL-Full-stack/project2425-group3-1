import scheduleDb from '../repository/schedule.db';
import { Schedule } from '../model/schedule';
import { Workout } from '../model/workout';

const getAllSchedules = (): Schedule[] => scheduleDb.getAllSchedules();

const addWorkoutsToSchedule = (scheduleId: number, workouts: Workout[]): Schedule => {
    const schedule = scheduleDb.getScheduleById(scheduleId)
    if (!schedule) {
        throw new Error(`No schedule found with ID ${scheduleId}`);
    }

    workouts.forEach((workout) => {
        schedule.addWorkoutToSchedule(workout)
    })
    return schedule
}


export default { getAllSchedules, addWorkoutsToSchedule };
