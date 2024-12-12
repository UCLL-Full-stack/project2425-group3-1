import scheduleService from '../../service/schedule.service';
import scheduleDb from '../../repository/schedule.db';
import { Schedule } from '../../model/schedule';
import { ScheduleInput } from '../../types';


const scheduleInput: ScheduleInput = {
    date: new Date('2024-12-15'),
    calorieBurn: 500,
    totalTime: 60,
    workouts: []
};

const schedule = new Schedule({
  id: 1,
  date: new Date('2024-12-15'),
  calorieBurn: 500,
  totalTime: 60,
  workouts: [],
});


let mockScheduleDbGetAllSchedules: jest.Mock;
let mockScheduleDbGetScheduleById: jest.Mock;
let mockScheduleDbAddSchedule: jest.Mock;
let mockScheduleDbAddWorkoutsToSchedule: jest.Mock;

beforeEach(() => {
  mockScheduleDbGetAllSchedules = jest.fn();
  mockScheduleDbGetScheduleById = jest.fn();
  mockScheduleDbAddSchedule = jest.fn();
  mockScheduleDbAddWorkoutsToSchedule = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});


test('given: schedules exist in database, when: getAllSchedules is called, then: all schedules are returned', async () => {
  // Given
  scheduleDb.getAllSchedules = mockScheduleDbGetAllSchedules.mockResolvedValue([schedule]);

  // When
  const result = await scheduleService.getAllSchedules();

  // Then
  expect(result).toEqual([schedule]);
  expect(mockScheduleDbGetAllSchedules).toHaveBeenCalledTimes(1);
});

test('given: valid schedule input, when: addSchedule is called, then: the schedule is added successfully', async () => {
  // Given
  scheduleDb.addSchedule = mockScheduleDbAddSchedule.mockResolvedValue(schedule);

  // When
  const result = await scheduleService.addSchedule(scheduleInput);

  // Then
  expect(result).toEqual(schedule);
  expect(mockScheduleDbAddSchedule).toHaveBeenCalledTimes(1);
  expect(mockScheduleDbAddSchedule).toHaveBeenCalledWith(expect.objectContaining({
    date: new Date('2024-12-15'),
    calorieBurn: 500,
    totalTime: 60,
  }));
});

test('given: schedule id is invalid, when: getScheduleById is called, then: return null', async () => {
  // Given
  scheduleDb.getScheduleById = mockScheduleDbGetScheduleById.mockResolvedValue(null);

  // When
  const result = await scheduleService.getScheduleById(999); 

  // Then
  expect(result).toBeNull();
  expect(mockScheduleDbGetScheduleById).toHaveBeenCalledTimes(1);
  expect(mockScheduleDbGetScheduleById).toHaveBeenCalledWith(999);
});

test('given: valid schedule id, when: getScheduleById is called, then: return the schedule', async () => {
  // Given
  scheduleDb.getScheduleById = mockScheduleDbGetScheduleById.mockResolvedValue(schedule);

  // When
  const result = await scheduleService.getScheduleById(1);

  // Then
  expect(result).toEqual(schedule);
  expect(mockScheduleDbGetScheduleById).toHaveBeenCalledTimes(1);
  expect(mockScheduleDbGetScheduleById).toHaveBeenCalledWith(1);
});

test('given: valid schedule id and workout ids, when: addWorkoutsToSchedule is called, then: workouts are added to the schedule', async () => {
  // Given
  const workoutIds = [1, 2, 3];
  scheduleDb.addWorkoutsToSchedule = mockScheduleDbAddWorkoutsToSchedule.mockResolvedValue(schedule);

  // When
  const result = await scheduleService.addWorkoutsToSchedule(1, workoutIds);

  // Then
  expect(result).toEqual(schedule);
  expect(mockScheduleDbAddWorkoutsToSchedule).toHaveBeenCalledTimes(1);
  expect(mockScheduleDbAddWorkoutsToSchedule).toHaveBeenCalledWith(1, workoutIds);
});
