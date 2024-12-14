/**
 * @swagger
 * 
 *   components:
 *    schemas:
 *      Schedule:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            date:
 *              type: string
 *              format: date-time
 *            calorieburn:
 *              type: number
 *            totalTime:
 *              type: number
 *            workouts:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Workout'
 *      ScheduleInput:
 *          type: object
 *          properties:
 *            date:
 *              type: string
 *              format: date-time
 *            calorieburn:
 *              type: number
 *            totalTime:
 *              type: number
 *            workouts:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Workout'
 */
import express, { NextFunction, Request, Response } from 'express';
import workoutService from '../service/workout.service';
import scheduleService from '../service/schedule.service';
import { error } from 'console';
import { ScheduleInput } from '../types';

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

/**
 * @swagger
 * /schedules:
 *   post:
 *      summary: Create a new schedule.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ScheduleInput'
 *      responses:
 *         200:
 *            description: The created schedule.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schedule = <ScheduleInput>req.body;
        const result = await scheduleService.addSchedule(schedule);
        res.status(200).json(result);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Delete a schedule by ID
 *     description: This endpoint deletes a schedule based on schedule ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the schedule to be deleted.
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Schedule deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule deleted successfully"
 *       400:
 *         description: Invalid schedule ID,could not delete the schedule.
 *       404:
 *         description: Schedule not found.
 *       500:
 *         description: Internal server error.
 */
scheduleRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const scheduleId = parseInt(req.params.id);
        const result = await scheduleService.deleteSchedule(scheduleId);
        return res.status(200).json(result);
    } catch (error) {
        const err = error as Error;
        res.status(400).json({
            status: 'Error, could not delete the schedule',
            message: err.message,
        });
    }
});

export { scheduleRouter };
