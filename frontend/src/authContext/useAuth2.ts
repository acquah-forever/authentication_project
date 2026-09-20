import { getProfile, createProfile, updateProfile, type ProfileInput } from "../api/profile"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        refetchOnWindowFocus: false
    });
}

export function useCreateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ProfileInput) => createProfile(data),
        onSuccess: (newProfile) => {
            queryClient.setQueryData(["profile"], newProfile);
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}:{id:string, data: ProfileInput}) => updateProfile(id, data),
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(["profile"], updatedProfile);
        },
    });
}

