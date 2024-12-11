import { Workout } from '@prisma/client';

type Role = 'admin' | 'guest' | 'user';

type UserInput = {
    id?: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};

type WorkoutInput = {
    id?: number;
    location?: string;
    level?: number;
    time?: number;
    name?: string;
    calorie?: number;
    muscle?: string;
    muscleImage?: string;
};

type ScheduleInput = {
    id?: number;
    date: Date;
    calorieBurn: number;
    totalTime: number;
    workouts: WorkoutInput[];
};

type EnrollmentInput = {
    schedule: ScheduleInput;
};

type AuthenticationResponse = {
    role: Role;
    token: string;
    username: string;
    fullname: string;
};

export { Role, UserInput, WorkoutInput, ScheduleInput, EnrollmentInput, AuthenticationResponse };
