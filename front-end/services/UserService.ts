import { User } from "@/types";

const loginUser = async (user: User) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

      
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

      
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const signupUser = async (user: User) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Signup failed');
        }

        return responseData;  
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};
const UserService = {
    loginUser,
    signupUser,
};

export default UserService;
