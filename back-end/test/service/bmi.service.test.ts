import bmiService from '../../service/bmi.service';
import bmiDb from '../../repository/bmi.db';
import { Bmi } from '../../model/bmi';

jest.mock('../../repository/bmi.db');

let mockAddBmi: jest.Mock;
let mockGetAllBmi: jest.Mock;

beforeEach(() => {
  mockAddBmi = bmiDb.addBmi as jest.Mock;
  mockGetAllBmi = bmiDb.getAllBmi as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

test('given: BMIs exist in database, when: getAllBmi is called, then: all BMIs are returned', async () => {
  // Given
  const bmi = new Bmi({
    length: 1.75,
    weight: 70,
    bmiValue: 22.9,
  });

  mockGetAllBmi.mockResolvedValue([bmi]);

  // When
  const result = await bmiService.getAllBmi();

  // Then
  expect(result).toEqual([bmi]);
  expect(mockGetAllBmi).toHaveBeenCalledTimes(1);
});

test('given: no BMIs in database, when: getAllBmi is called, then: empty array is returned', async () => {
  // Given
  mockGetAllBmi.mockResolvedValue([]);

  // When
  const result = await bmiService.getAllBmi();

  // Then
  expect(result).toEqual([]);
  expect(mockGetAllBmi).toHaveBeenCalledTimes(1);
});

test('given: valid BMI data, when: addBmi is called, then: new BMI record is added successfully', async () => {
  // Given
  const data = {
    length: 1.75,
    weight: 70,
    bmiValue: 22.9,
  };

  const bmi = new Bmi({
    length: data.length,
    weight: data.weight,
    bmiValue: data.bmiValue,
  });

  mockAddBmi.mockResolvedValue(bmi);

  // When
  const result = await bmiService.addBmi(data);

  // Then
  expect(result).toEqual(bmi);
  expect(mockAddBmi).toHaveBeenCalledTimes(1);
  expect(mockAddBmi).toHaveBeenCalledWith(data); 
});

test('given: invalid BMI data, when: addBmi is called, then: error is thrown', async () => {
  // Given
  const invalidData = {
    length: -1.75, 
    weight: 70,
    bmiValue: 22.9,
  };

  mockAddBmi.mockRejectedValue(new Error('Invalid BMI data'));

  // When & Then
  await expect(bmiService.addBmi(invalidData)).rejects.toThrowError('Invalid BMI data');
  expect(mockAddBmi).toHaveBeenCalledTimes(1);
  expect(mockAddBmi).toHaveBeenCalledWith(invalidData); 
});
