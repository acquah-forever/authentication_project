import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createApplication, type ApplicationInput } from "../api/application";

export function useCreateApplication() {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ApplicationInput) => createApplication(data),
        onSuccess: (newApplication) => {
            queryClient.setQueryData(["application"], newApplication)

        },

        onError: (error) => {
            console.error("CREATE APPLICATION ERROR:", error)
        },
    })
}