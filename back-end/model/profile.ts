export class Profile {
    private id?: number;
    private lastName: string;
    private firstName: string;
    private email: string;

    constructor(profile: { id?: number; lastName: string; firstName: string; email: string }) {
        this.lastName = profile.lastName;
        this.firstName = profile.firstName;
        this.email = profile.email;
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
        return this.lastName;
    }

    equals(profile: Profile): boolean {
        return (
            this.lastName === profile.getLastName() &&
            this.firstName === profile.getFirstName() &&
            this.email === profile.getEmail()
        );
    }
}
