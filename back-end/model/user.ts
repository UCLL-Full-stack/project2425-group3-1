export class User {
    private id?: number;
    private name: string;
    private password: string;

    constructor(user: { name: string; password: string; id?: number }) {
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }


    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }

    equals(user: User): boolean {
        return (
            this.name === user.getName() &&
            this.password === user.getPassword()
        );
    }
}
