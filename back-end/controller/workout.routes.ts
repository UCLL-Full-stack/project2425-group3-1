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

const workoutRouter = express.Router();

/**
 * @swagger
 * /workouts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all workouts.
 *     description: Returns an array of the workouts.
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: Successfully retrieved list of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       500:
 *         description: Internal server error.
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
