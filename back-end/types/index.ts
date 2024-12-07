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

type ScheduleInput = {
    id?: number;
    start?: Date;
    end?: Date;
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


export {
    Role,
    UserInput,
    ScheduleInput,
    EnrollmentInput,
    AuthenticationResponse,
    
};

