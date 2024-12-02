import exp from 'constants';
import { Bmi } from '../../model/bmi';

test('given: valid values for Bmi, when: Bmi is created, then: Bmi is calculated with those values', () => {
    //given

    const length = 173;
    const weight = 75;
    const bmiValue = 22;
    //when

    const bmi = new Bmi({ length, weight, bmiValue });
    //then

    expect(bmi.getLenght()).toEqual(length);
    expect(bmi.getWeight()).toEqual(weight);
    expect(bmi.getBmiValue()).toEqual(bmiValue);
});
