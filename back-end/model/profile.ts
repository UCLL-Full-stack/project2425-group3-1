import { Profile as ProfilePrisma } from '@prisma/client';

export class Profile {
    private id?: number;
    private lastName: string;
    private firstName: string;
    private email: string;

    constructor(profile: { id?: number; lastName: string; firstName: string; email: string }) {
        this.validate(profile); 
        this.id = profile.id;
        this.lastName = profile.lastName;
        this.firstName = profile.firstName;
        this.email = profile.email;
    }

    static from({ id, lastName, firstName, email }: ProfilePrisma) {
        return new Profile({ id, lastName, firstName, email });
    }

  
    getId(): number | undefined {
        return this.id;
    }

    getLastName(): string {
        return this.lastName;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getEmail(): string {
        return this.email;
    }


    private validate(profile: { id?: number; lastName: string; firstName: string; email: string }): void {

        if (!profile.lastName || profile.lastName.trim().length === 0) {
            throw new Error('Last name is required and cannot be empty.');
        }

        if (!profile.firstName || profile.firstName.trim().length === 0) {
            throw new Error('First name is required and cannot be empty.');
        }

        if (!profile.email || profile.email.trim().length === 0) {
            throw new Error('Email is required and cannot be empty.');
        }
    }


    equals(profile: Profile): boolean {
        return (
            this.lastName === profile.getLastName() &&
            this.firstName === profile.getFirstName() &&
            this.email === profile.getEmail()
        );
    }
}
