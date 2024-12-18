import bcrypt from 'bcrypt';
import userDB from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import { User } from '../model/user';
import { Bmi } from '../model/bmi';
import bmiDb from '../repository/bmi.db';
import userDb from '../repository/user.db';
import scheduleDb from '../repository/schedule.db';
import { UnauthorizedError } from 'express-jwt';
import { error } from 'console';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });
    if (!user) {
        throw new Error('User not found.');
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
        userId: user.getId(),
    };
};

const createUser = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username });
    const existingEmail = await userDB.getUserByEmail({ email });

    if (existingUser || existingEmail) {
        throw new Error(`User with username ${username}/${email} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, firstName, lastName, email, role });

    return await userDB.createUser(user);
};

const updateUserBmi = async (userId: number, bmiValue: number): Promise<User> => {
    const user = await userDb.getUserById({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }

    let bmi: Bmi;

    if (user.getBmi()) {
        bmi = user.getBmi()!;

        if (bmi.getBmiValue() !== bmiValue) {
            const existingBmi = await bmiDb.getBmiByValue(bmiValue);

            if (existingBmi) {
                bmi = existingBmi;
            } else {
                const bmiId = bmi.getId();
                if (typeof bmiId !== 'number' || isNaN(bmiId)) {
                    throw new Error('BMI ID is invalid');
                }

                bmi = await bmiDb.updateBmi(bmiId, bmiValue);
            }
        }
    } else {
        const existingBmi = await bmiDb.getBmiByValue(bmiValue);

        if (existingBmi) {
            bmi = existingBmi;
        } else {
            bmi = await bmiDb.addBmi({ bmiValue });
        }
    }

    const bmiId = bmi.getId();
    if (typeof bmiId !== 'number' || isNaN(bmiId)) {
        throw new Error('BMI ID is invalid');
    }

    user.setBmi(bmi);

    await userDb.updateUser(user);

    return user;
};

const getDataForRole = async (userId: number, role: Role) => {
    if (role === 'admin') {
        return await userDB.getAllUsers();
    } else if (role === 'trainer') {
        return await bmiDb.getAllBmi();
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'you are not authorized to access this page',
        });
    }
};

export default {
    getUserByUsername,
    createUser,
    getAllUsers,
    authenticate,
    updateUserBmi,
    getDataForRole,
};
