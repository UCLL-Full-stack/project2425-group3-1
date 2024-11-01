import workoutDb from '../repository/workout.db';
import { Workout } from '../model/workout';

const getAllWorkouts = (): Workout[] => workoutDb.getAllWorkouts();

export default { getAllWorkouts };
