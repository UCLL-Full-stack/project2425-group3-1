import { Schedule } from "../../model/schedule";
import { Workout } from "../../model/workout";

test('given: valid values for schedule, when: schedule is created, then: schedule is created with those values', () => {
  // given
  const date = new Date('2024-10-24T10:00:00');
  const calorieBurn = 500;
  const totalTime = 90; 
  const workouts: Workout[] = [];


  // when
  const schedule = new Schedule({date, calorieBurn, totalTime, workouts});

  // then
  expect(schedule.getDate()).toEqual(date);
  expect(schedule.getCalorieBurn()).toEqual(calorieBurn);
  expect(schedule.getTotalTime()).toEqual(totalTime);
});

test('given: invalid date, when: schedule is created, then: an error is thrown', () => {
  // given
  const date = new Date('invalid-date');  
  const calorieBurn = 500;
  const totalTime = 90; 
  const workouts: Workout[] = []; 

  // when & then
  expect(() => {
    new Schedule({date, calorieBurn, totalTime, workouts});
  }).toThrowError('A valid date is required.'); 
});


test('given: invalid calorie burn (<= 0), when: schedule is created, then: an error is thrown', () => {
  // given
  const date = new Date('2024-10-24T10:00:00');
  const calorieBurn = -10; 
  const totalTime = 90; 
  const workouts: Workout[] = [];  

  // when & then
  expect(() => {
    new Schedule({date, calorieBurn, totalTime, workouts});
  }).toThrowError('Calorie burn must be above zero.'); 
});


test('given: invalid total time (<= 0), when: schedule is created, then: an error is thrown', () => {
  // given
  const date = new Date('2024-10-24T10:00:00');
  const calorieBurn = 500;
  const totalTime = 0; 
  const workouts: Workout[] = [];  

  // when & then
  expect(() => {
    new Schedule({date, calorieBurn, totalTime, workouts});
  }).toThrowError('Total time must b above zero.'); 
});
