import workoutDb from '../repository/workout.db';
import { Workout } from '../model/workout';
const getAllWorkouts = async (): Promise<Workout[]> => {
    return await workoutDb.getAllWorkouts();
};

export default {
    getAllWorkouts,
};
