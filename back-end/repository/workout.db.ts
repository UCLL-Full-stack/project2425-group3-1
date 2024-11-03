import { Workout } from '../model/workout';

const workouts = [
    new Workout({
        id: 1,
        location: 'test 1',
        level: 2,
        time: 60,
        name: 'test workout 1',
        calorie: 200,
        muscle: 'test muscle 1',
        muscleImage: '/images/Benen.jpg',
    }),
    new Workout({
        id: 2,
        location: 'test 2',
        level: 1,
        time: 120,
        name: 'test workout 2',
        calorie: 500,
        muscle: 'test muscle 2',
        muscleImage: '/images/homepagepic.png',
    }),
    new Workout({
        id: 3,
        location: 'test 3',
        level: 5,
        time: 30,
        name: 'test workout 3',
        calorie: 785,
        muscle: 'test muscle 3',
        muscleImage: '/images/Benen.jpg',
    }),
];

const getAllWorkouts = (): Workout[] => workouts;

export default {
    getAllWorkouts,
};
