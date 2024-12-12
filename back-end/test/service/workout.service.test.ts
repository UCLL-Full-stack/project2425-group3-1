import workoutService from '../../service/workout.service'; 
import workoutDb from '../../repository/workout.db';
import { Workout } from '../../model/workout';

let mockWorkoutDbGetAllWorkouts: jest.Mock;

beforeEach(() => {
  mockWorkoutDbGetAllWorkouts = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('given: workouts exist in database, when: getAllWorkouts is called, then: all workouts are returned', async () => {
  // Given
  const workout = new Workout({
    location: 'Gym',
    level: 3,
    time: 30,
    name: 'Push-up',
    calorie: 200,
    muscle: 'Chest',
    muscleImage: 'muscle-image.jpg',
    id: 1, 
  });

  workoutDb.getAllWorkouts = mockWorkoutDbGetAllWorkouts.mockResolvedValue([workout]);

  // When
  const result = await workoutService.getAllWorkouts();

  // Then
  expect(result).toEqual([workout]);
  expect(mockWorkoutDbGetAllWorkouts).toHaveBeenCalledTimes(1);
});

test('given: no workouts exist in database, when: getAllWorkouts is called, then: return an empty array', async () => {
  // Given
  workoutDb.getAllWorkouts = mockWorkoutDbGetAllWorkouts.mockResolvedValue([]);

  // When
  const result = await workoutService.getAllWorkouts();

  // Then
  expect(result).toEqual([]);
  expect(mockWorkoutDbGetAllWorkouts).toHaveBeenCalledTimes(1);
});
