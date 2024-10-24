import { Schedule } from "../../model/schedule";

test('given: valid values for schedule, when: schedule is created, then: schedule is created with those values', () => {
  // given
  const date = new Date('2024-10-24T10:00:00');
  const calorieBurn = 500;
  const totalTime = 90; 


  // when
  const schedule = new Schedule({date, calorieBurn, totalTime });

  // then
  expect(schedule.getDate()).toEqual(date);
  expect(schedule.getCalorieBurn()).toEqual(calorieBurn);
  expect(schedule.getTotalTime()).toEqual(totalTime);
});