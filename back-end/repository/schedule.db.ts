import { Schedule } from '../model/schedule';
import { Workout } from '../model/workout';
const testWorkouts1 = [
    new Workout({
        id: 1,
        location: 'Gym',
        level: 2,
        time: 30,
        name: 'Running',
        calorie: 300,
        muscle: 'Legs',
    }),
    new Workout({
        id: 2,
        location: 'Park',
        level: 3,
        time: 45,
        name: 'Cycling',
        calorie: 400,
        muscle: 'Legs',
    }),
];

const testSchedules = [
    new Schedule({
        id: 1,
        date: new Date('2024-11-01'),
        calorieBurn: 150,
        totalTime: 500,
        workouts: testWorkouts1,
    }),
];

const getAllSchedules = (): Schedule[] => testSchedules;

export default { getAllSchedules };
