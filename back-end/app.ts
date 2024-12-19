import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { workoutRouter } from './controller/workout.routes';
import { scheduleRouter } from './controller/schedule.routes';
import { bmiRouter } from './controller/bmi.routes';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import path from 'path';

const app = express();
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            connectSrc: ['self', 'https://api.ucll.be', 'localhost:3000'],
        },
    })
);
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/users/login', '/users/signup', '/status', '/api-docs', /^\/api-docs\/.*/, 'public/images', '/images', '/^\/images\/.*/'],
    })
);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/workouts', workoutRouter);
app.use('/schedules', scheduleRouter);
app.use('/bmi', bmiRouter);
app.use('/users', userRouter);

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
