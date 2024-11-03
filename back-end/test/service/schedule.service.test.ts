import { Schedule } from '../../model/schedule';
import { Workout } from '../../model/workout';
import scheduleDb from '../../repository/schedule.db';
import scheduleService from '../../service/schedule.service';

const testWorkout = new Workout({
    id: 1,
    location: 'Gym',
    level: 2,
    time: 30,
    name: 'Running',
    calorie: 300,
    muscle: 'Legs',
    muscleImage: '/homepagepic.png',
});

const testSchedule = new Schedule({
    id: 1,
    date: new Date('2024-11-01'),
    calorieBurn: 150,
    totalTime: 500,
    workouts: [],
});


let mockGetScheduleById: jest.Mock<any, any, any>;

beforeEach(() => {
    mockGetScheduleById = jest.fn();

    scheduleDb.getScheduleById = mockGetScheduleById;

    mockGetScheduleById.mockReturnValue(testSchedule);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid schedule and workout, when workout is added, then the workout is added to the schedule', () => {
    const updatedSchedule = scheduleService.addWorkoutsToSchedule(1, [testWorkout]);

    expect(mockGetScheduleById).toHaveBeenCalledWith(1);
    expect(updatedSchedule.getWorkouts()).toContainEqual(testWorkout);
});

test('given a non-existing schedule, when workout is added, then an error is thrown', () => {
    mockGetScheduleById.mockReturnValueOnce(null);

    const addWorkoutToNonExistentSchedule = () =>
        scheduleService.addWorkoutsToSchedule(999, [testWorkout]);

    expect(addWorkoutToNonExistentSchedule).toThrow('No schedule found with ID 999');
});
