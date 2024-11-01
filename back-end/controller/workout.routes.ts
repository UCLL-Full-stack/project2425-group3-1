import express, { NextFunction, Request, Response } from 'express';
import workoutService from '../service/workout.service';

const workoutRouter = express.Router();

/**
 * @swagger
 * /lecturers:
 *   get:
 *     summary: Get a list of all Workouts.
 *     responses:
 *       200:
 *         description: A list of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Workout'
 */
workoutRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lecturers = await workoutService.getAllWorkouts();
        res.status(200).json(lecturers);
    } catch (error) {
        next(error);
    }
});

export { workoutRouter };
