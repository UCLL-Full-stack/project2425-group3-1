import { Goal } from '../../model/goal';

test('given: valid values for goal, when: goal is created, then: goal is created with those values', () => {
    //given
    const goalType = 'lose weight';
    //when

    const goal = new Goal({ goalType });
    //then

    expect(goal.getGoalType()).toEqual(goalType);
});
