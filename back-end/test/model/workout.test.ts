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


test('given: empty location, when: workout is created, then: an error is thrown', () => {
    // given
    const location = '';  
    const level = 3;
    const time = 60;
    const name = 'Upperbody';
    const calorie = 500;
    const muscle = 'Chest';
    const muscleImage = '/path/to/image1.jpg';
  
    // when & then
    expect(() => {
        new Workout({ location, level, time, name, calorie, muscle, muscleImage });
    }).toThrowError('Location is required.'); 
});

test('given: invalid level (less than 1), when: workout is created, then: an error is thrown', () => {
    // given
    const location = 'BasicFit Leuven';
    const level = 0; 
    const time = 60;
    const name = 'Upperbody';
    const calorie = 500;
    const muscle = 'Chest';
    const muscleImage = '/path/to/image1.jpg';
  
    // when & then
    expect(() => {
        new Workout({ location, level, time, name, calorie, muscle, muscleImage });
    }).toThrowError('Level must be between 1 and 5.'); 
});

test('given: invalid level (greater than 5), when: workout is created, then: an error is thrown', () => {
    // given
    const location = 'BasicFit Leuven';
    const level = 6; 
    const time = 60;
    const name = 'Upperbody';
    const calorie = 500;
    const muscle = 'Chest';
    const muscleImage = '/path/to/image1.jpg';
  
    // when & then
    expect(() => {
        new Workout({ location, level, time, name, calorie, muscle, muscleImage });
    }).toThrowError('Level must be between 1 and 5.'); 
});

test('given: invalid calorie (less than or equal to 0), when: workout is created, then: an error is thrown', () => {
    // given
    const location = 'BasicFit Leuven';
    const level = 3;
    const time = 60;
    const name = 'Upperbody';
    const calorie = 0;  
    const muscle = 'Chest';
    const muscleImage = '/path/to/image1.jpg';
  
    // when & then
    expect(() => {
        new Workout({ location, level, time, name, calorie, muscle, muscleImage });
    }).toThrowError('Calorie count must be greater than zero.'); 
});

test('given: invalid calorie (negative value), when: workout is created, then: an error is thrown', () => {
    // given
    const location = 'BasicFit Leuven';
    const level = 3;
    const time = 60;
    const name = 'Upperbody';
    const calorie = -100; 
    const muscle = 'Chest';
    const muscleImage = '/path/to/image1.jpg';
  
    // when & then
    expect(() => {
        new Workout({ location, level, time, name, calorie, muscle, muscleImage });
    }).toThrowError('Calorie count must be greater than zero.'); 
});

