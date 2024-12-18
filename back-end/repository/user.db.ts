import { User } from '../model/user';
import database from '../util/database';
import bmiDB from '../repository/bmi.db';
import { PrismaClient } from '@prisma/client';
import { Bmi } from '../model/bmi';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await prisma.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await prisma.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await prisma.user.findFirst({
            where: { username },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await prisma.user.findFirst({
            where: { email },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await prisma.user.create({
            data: {
                username: user.getUsername(),
                password: user.getPassword(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateUser = async (user: User): Promise<User> => {
    const updatedUser = await prisma.user.update({
        where: { id: user.getId() },
        data: {
            username: user.getUsername(),
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            bmiId: user.getBmi() ? user.getBmi()?.getId() : undefined,
        },
    });
    return User.from(updatedUser);
};

export default {
    getAllUsers,
    createUser,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    updateUser,
};
