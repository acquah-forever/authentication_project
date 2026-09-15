import { getProfile, createProfile, updateProfile } from "../api/profile"; 
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
        mutationFn: (data: Parameters<typeof createProfile>[0]) => createProfile(data),
        onSuccess: (newProfile) => {
            queryClient.setQueryData(["profile"], newProfile);
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Parameters<typeof updateProfile>[0]) => updateProfile(data),
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(["profile"], updatedProfile);
        },
    });
}

