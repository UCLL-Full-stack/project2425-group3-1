/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Authentication response.
 *         token:
 *           type: string
 *           description: JWT access token.
 *         username:
 *           type: string
 *           description: User name.
 *         fullname:
 *           type: string
 *           description: Full name.
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User name.
 *         password:
 *           type: string
 *           description: User password.
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *           description: User name.
 *         password:
 *           type: string
 *           description: User password.
 *         firstName:
 *           type: string
 *           description: First name.
 *         lastName:
 *           type: string
 *           description: Last name.
 *         email:
 *           type: string
 *           description: E-mail.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         bmi:
 *           type: number
 *           description: The BMI of the user.
 *           example: 24.5
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User name.
 *         password:
 *           type: string
 *           description: User password.
 *         firstName:
 *           type: string
 *           description: First name.
 *         lastName:
 *           type: string
 *           description: Last name.
 *         email:
 *           type: string
 *           description: E-mail.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     Role:
 *       type: string
 *       enum: [admin, user, guest]
 *     UserWithBmi:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, user, guest]
 *         bmi:
 *           type: number
 *           description: The BMI value of the user.
 *           example: 24.5
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { Role, UserInput } from '../types/index';
import bmiService from '../service/bmi.service';
import { ro } from 'date-fns/locale';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Login using username/password. Returns an object with JWT token and user name when succesful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        if (response.token) {
            return res.status(200).json({
                message: 'Authentication successful',
                token: response.token,
                username: response.username,
                fullname: response.fullname,
                userId: response.userId,
                role: response.role,
            });
        }
        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /users/signup:
 *   post:
 *      summary: Create a user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json({
            message: 'User created successfully',
            user: user,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{userId}/bmi:
 *   put:
 *     summary: Update BMI for a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose BMI is being updated.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bmiValue:
 *                 type: number
 *                 description: The BMI value to be updated.
 *                 example: 24.5
 *     responses:
 *       200:
 *         description: The updated user with the new BMI.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       400:
 *         description: Invalid BMI value provided.
 */
userRouter.put('/:userId/bmi', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const { bmiValue } = req.body;

        if (!bmiValue || bmiValue <= 0) {
            return res.status(400).json({ message: 'Invalid BMI value.' });
        }

        const updatedUser = await userService.updateUserBmi(userId, bmiValue);

        res.status(200).json({
            id: updatedUser.getId(),
            username: updatedUser.getUsername(),
            firstName: updatedUser.getFirstName(),
            lastName: updatedUser.getLastName(),
            email: updatedUser.getEmail(),
            role: updatedUser.getRole(),
            bmi: { bmiValue: updatedUser.getBmi()?.getBmiValue() },
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/roleData:
 *   get:
 *     summary: Get data based on role
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/roleData', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { userId: number; role: Role } };
        const { userId, role } = request.auth;

        const data = await userService.getDataForRole(userId, role);
        return res.status(200).json({
            data,
        });
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).json({ message: 'Failed to retrieve data' });
    }
});

export { userRouter };
