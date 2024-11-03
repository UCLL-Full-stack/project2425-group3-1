/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Lecturer:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Lecturer name.
 *            expertise:
 *              type: string
 *              description: Lecturer expertise.
 */
import express, { NextFunction, Request, Response } from 'express';
import workoutService from '../service/workout.service';
import scheduleService from '../service/schedule.service';

const scheduleRouter = express.Router();

/**
 * @swagger
 * /schedules:
 *    get:
 *     summary: Get a list of all schedules.
 *     description: Returns an array of the schedules.
 *     tags:
 *       - Schedules
 *     responses:
 *       200:
 *         description: Successfully retrieved list of schedules.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal server error.
 */

scheduleRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shcedules = await scheduleService.getAllSchedules();
        res.status(200).json(shcedules);
    } catch (error) {
        next(error);
    }
});


scheduleRouter.post('/add/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const body = req.body
        const schedule = scheduleService.addWorkoutsToSchedule(id, body);
        res.status(200).json(schedule);
    } catch (error) {
        next(error);
    }
});


export { scheduleRouter };


