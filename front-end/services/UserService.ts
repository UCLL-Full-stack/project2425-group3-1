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

        // Check if response is ok (status code 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        // Parse and return the JSON response
        const data = await response.json();
        return data; // This could be a token or user data depending on your backend
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

        // Check if response is ok (status code 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
        }

        // Parse and return the JSON response
        const data = await response.json();
        return data; // This could be user data or a success message
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
