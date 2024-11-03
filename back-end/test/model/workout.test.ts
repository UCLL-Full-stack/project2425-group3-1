import { Workout } from "../../model/workout";

test('given: valid values for workout, when: workout is created, then: workout is created with those values', () => {
    // given
    const location = 'BasicFit Leuven';
    const level = 3;
    const time = 60; 
    const name = 'Upperbody';
    const calorie = 500;
    const muscle = 'Chest';
    const muscleImage= '/path/to/image1.jpg'
  
    // when
    const workout = new Workout({location, level, time, name, calorie, muscle, muscleImage});
  
    // then
    expect(workout.getLocation()).toEqual(location);
    expect(workout.getLevel()).toEqual(level);
    expect(workout.getTime()).toEqual(time);
    expect(workout.getName()).toEqual(name);
    expect(workout.getCalorie()).toEqual(calorie);
    expect(workout.getMuscle()).toEqual(muscle);

});
