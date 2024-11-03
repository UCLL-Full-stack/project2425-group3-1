import scheduleDb from '../repository/schedule.db';
import { Schedule } from '../model/schedule';

const getAllSchedules = (): Schedule[] => scheduleDb.getAllSchedules();




export default { getAllSchedules };
