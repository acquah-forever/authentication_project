
export interface User {
    username: string;
    email: string;
}

export interface SignupData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    username: string;
    password: string;
}

interface ApiError {
    error: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    if (!response.ok) {
        throw new Error((data as ApiError).error || "Something went wrong");
    }
    return data;
}

export async function getAuthenticatedUser(): Promise<User> {
    const response = await fetch("/api/users", {
        credentials: "include",
    });

    return handleResponse<User>(response);
}

export async function signupUser(data: SignupData): Promise<User> {
    const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleResponse<User>(response);
}

export async function loginUser(data: LoginData): Promise<User> {
    const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return handleResponse<User>(response);
}

export async function logoutUser(): Promise<{ message: string }> {
    const response = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
    });
    return handleResponse<{ message: string }>(response);
}
