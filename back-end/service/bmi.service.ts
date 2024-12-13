import bmiDb from '../repository/bmi.db';
import { Bmi } from '../model/bmi';
const addBmi = async (data: { length: number; weight: number; bmiValue: number }): Promise<Bmi> => {
    return await bmiDb.addBmi(data);
};

const getAllBmi = async (): Promise<Bmi[]> => {
    return await bmiDb.getAllBmi();
};


export default { addBmi, getAllBmi };
