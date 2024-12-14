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

    expect(bmi.getLength()).toEqual(length);
    expect(bmi.getWeight()).toEqual(weight);
    expect(bmi.getBmiValue()).toEqual(bmiValue);
});


test('given: invalid bmi value, when: Bmi is created, then: an error is thrown', () => {
    // given
    const length = 173;
    const weight = 75;
    const bmiValue = -22; 

    // when & then
    expect(() => {
        new Bmi({ length, weight, bmiValue });
    }).toThrowError('BMI value must be a positive number.'); 
});


test('given: missing bmi value, when: Bmi is created, then: an error is thrown', () => {
    // given
    const length = 173;
    const weight = 75;
    const bmiValue = 0; 

    // when & then
    expect(() => {
        new Bmi({ length, weight, bmiValue });
    }).toThrowError('BMI value must be a positive number.'); 
});
