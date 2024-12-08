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
        const schedules = await scheduleService.getAllSchedules();
        res.status(200).json(schedules);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /schedules/addWorkout:
 *   post:
 *     summary: Add selected workouts to a schedule
 *     description: This endpoint adds a list of selected workouts to a schedule by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleId:
 *                 type: integer
 *                 description: ID of the schedule to which workouts will be added.
 *               workoutsId:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of workout IDs to add to the schedule.
 *     responses:
 *       200:
 *         description: Workouts added to schedule successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Workouts added to schedule successfully"
 *       400:
 *         description: Invalid request body or missing parameters.
 *       500:
 *         description: Internal server error.
 */
scheduleRouter.post('/addWorkout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { scheduleId, workoutsId } = req.body;

        const result = await scheduleService.addWorkoutsToSchedule(scheduleId, workoutsId);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { scheduleRouter };
