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


/**
 * @swagger
 * /schedules/add/{id}:
 *    post:
 *     summary: Add workouts to a schedule.
 *     description: Adds one or more workouts to a schedule specified by ID.
 *     tags:
 *       - Schedules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: The ID of the schedule to which workouts will be added.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workouts:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of workout IDs to add to the schedule.
 *             required:
 *               - workouts
 *     responses:
 *       200:
 *         description: Successfully added workouts to the schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scheduleId:
 *                   type: integer
 *                   format: int64
 *                   description: ID of the updated schedule.
 *                 addedWorkouts:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: List of added workout IDs.
 *       400:
 *         description: Bad request, possibly due to invalid data.
 *       404:
 *         description: Schedule not found.
 *       500:
 *         description: Internal server error.
 */

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


