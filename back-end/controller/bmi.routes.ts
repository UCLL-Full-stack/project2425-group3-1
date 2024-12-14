/**
 * @swagger
 *   components:
 *    schemas:
 *      Bmi:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique ID of the BMI entry.
 *            length:
 *              type: number
 *              format: float
 *              description: Height in centimeters.
 *            weight:
 *              type: number
 *              format: float
 *              description: Weight in kilograms.
 *            bmiValue:
 *              type: number
 *              format: float
 *              description: Calculated BMI value.
 */
import express, { NextFunction, Request, Response } from 'express';
import bmiService from '../service/bmi.service';

const bmiRouter = express.Router();

/**
 * @swagger
 * /bmi:
 *    post:
 *     summary: Calculate and save BMI data.
 *     description: Accepts height and weight, calculates BMI, and stores it in the database.
 *     tags:
 *       - BMI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               length:
 *                 type: number
 *                 format: float
 *                 description: Height in centimeters.
 *                 example: 175
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: Weight in kilograms.
 *                 example: 70
 *             required:
 *               - length
 *               - weight
 *     responses:
 *       201:
 *         description: BMI calculated and saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bmi'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */

bmiRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { length, weight } = req.body;

        if (!length || !weight || length <= 0 || weight <= 0) {
            return res.status(400).json({ error: 'Height and weight must be positive numbers.' });
        }

        const bmiValue = parseFloat((weight / (length / 100) ** 2).toFixed(2));

        const savedBmi = await bmiService.addBmi({ length, weight, bmiValue });
        res.status(200).json(savedBmi);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /bmi:
 *    get:
 *     summary: Retrieve all BMI entries, including associated users.
 *     description: Returns a list of all BMI records stored in the database, along with the users who are associated with each BMI.
 *     tags:
 *       - BMI
 *     responses:
 *       200:
 *         description: Successfully retrieved list of BMI entries with associated users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bmi'
 *       500:
 *         description: Internal server error.
 */
bmiRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bmiRecords = await bmiService.getAllBmi();
        res.status(200).json(bmiRecords);
    } catch (error) {
        next(error);
    }
});

export { bmiRouter };
