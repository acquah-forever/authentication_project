import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAbout, createAbout, updateAbout, type AboutInput } from "../api/about"

export function useGetAbout() {
    return useQuery({
        queryKey: ["about"],
        queryFn: getAbout,
        refetchOnWindowFocus: false
    })
}

export function useCreateAbout() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: AboutInput) => createAbout(data),
        onSuccess: (newAbout) => {
            queryClient.setQueryData(["about"], newAbout)
        }
    })
}

export function useUpdateAbout() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: AboutInput }) => updateAbout(id, data),
        onSuccess: (updatedAbout) => {
            queryClient.setQueryData(["about"], updatedAbout)
        }
    })
}