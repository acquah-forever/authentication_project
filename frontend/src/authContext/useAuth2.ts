import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, createProfile, updateProfile } from "../api/profile"; 

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
        mutationFn: ({id, data}:{id:string, data: Parameters<typeof updateProfile>[1]}) => updateProfile(id, data),
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(["profile"], updatedProfile);
        },
    });
}

