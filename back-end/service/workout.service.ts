import workoutDb from '../repository/workout.db';
import { Workout } from '@prisma/client';

const getAllWorkouts = async (): Promise<Workout[]> => {
    return await workoutDb.getAllWorkouts();
};

export default {
    getAllWorkouts,
};
