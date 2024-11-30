import { Schedule } from '../model/schedule';
import { Workout } from '../model/workout';
// const testWorkouts1 = [
//     new Workout({
//         id: 1,
//         location: 'Gym',
//         level: 2,
//         time: 30,
//         name: 'Running',
//         calorie: 300,
//         muscle: 'Legs',
//         muscleImage: '/homepagepic.png',
//     }),
//     new Workout({
//         id: 2,
//         location: 'Park',
//         level: 3,
//         time: 45,
//         name: 'Cycling',
//         calorie: 400,
//         muscle: 'Legs',
//         muscleImage: '/homepagepic.png',
//     }),
// ];

const testSchedules = [
    new Schedule({
        id: 1,
        date: new Date('2024-11-01'),
        calorieBurn: 150,
        totalTime: 500,
        workouts: [],
    }),
];

const getAllSchedules = (): Schedule[] => testSchedules;

// const getScheduleById = (scheduleId: number): Schedule => {
//     let schedule = null
//     testSchedules.forEach((s) => {
//         if (scheduleId === s.getId()) {
//             schedule = s
//         }
//     })
//     if (schedule === null) throw new Error(`no schedule found!`)
//     return schedule
// }

const getScheduleById = (scheduleId: number): Schedule => {
    const schedule = testSchedules.find((s) => s.getId() === scheduleId);

    if (!schedule) {
        throw new Error(`No schedule found with ID ${scheduleId}`);
    }

    return schedule;
};



export default { getAllSchedules, getScheduleById };
