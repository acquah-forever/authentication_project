import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedUser, signupUser, loginUser, logoutUser, type LoginData, type SignupData, type User } from "../api/users";

export function useAuthenticatedUser() {
    return useQuery({
        queryKey: ["authenticatedUser"],
        queryFn: getAuthenticatedUser,
        retry: false,
    });
}

export function useSignup() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SignupData) => signupUser(data),
        onSuccess: (user) => {
            queryClient.setQueryData<User>(["authenticatedUser"], user);
        },
    });
}

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginData) => loginUser(data),
        onSuccess: (user) => {
            queryClient.setQueryData<User>(["authenticatedUser"], user);
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ["authenticatedUser"],
            });
        },
    });
}
