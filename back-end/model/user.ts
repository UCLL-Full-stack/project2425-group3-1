import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';
import { Bmi } from './bmi';

export class User {
    private id?: number;
    private username: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: Role;
    private bmiId?: number | null; // bmiId kan nu null zijn
    private bmi?: Bmi;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        bmiId?: number | null;
        bmi?: Bmi;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.bmiId = user.bmiId ?? null;  // bmiId kan null zijn
        this.bmi = user.bmi;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    getBmiId(): number | null | undefined {
        return this.bmiId;
    }

    getBmi(): Bmi | undefined {
        return this.bmi;
    }

    setBmi(bmi: Bmi): void {
        if (!bmi) {
            throw new Error('BMI cannot be null or undefined.');
        }
        this.bmi = bmi;
        this.bmiId = bmi.getId(); // Set bmiId when a BMI is assigned
    }

    validate(user: {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        bmiId?: number | null;
        bmi?: Bmi;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    static from({
        id,
        username,
        firstName,
        lastName,
        email,
        password,
        role,
        bmiId,
        bmi,
    }: UserPrisma & { bmiId?: number | null; bmi?: Bmi }): User {
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
            role: role as Role,
            bmiId: bmiId ?? null, // Zorg ervoor dat bmiId null kan zijn
            bmi,
        });
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            (this.bmi?.equals(user.getBmi()!) ?? false)
        );
    }
}
