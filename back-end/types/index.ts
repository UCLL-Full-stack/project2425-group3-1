type Role = 'admin' | 'guest' | 'user';

type UserInput = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    password?: string;
};

type ScheduleInput = {
    id?: number;
    start?: Date;
    end?: Date;
};

type EnrollmentInput = {
    schedule: ScheduleInput;
};

type AuthenticationResponse = {
    role: string;
    token: string;
    username: string;
    fullname: string;
};


export {
    Role,
    UserInput,
    ScheduleInput,
    EnrollmentInput,
    AuthenticationResponse,
    
};

