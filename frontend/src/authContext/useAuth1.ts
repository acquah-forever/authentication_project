import { useQuery } from "@tanstack/react-query";
import { getJobs, getJobById } from "../api/jobs";

export function useJobs() {
    return useQuery({
        queryKey: ["jobs"],
        queryFn: getJobs,
        refetchOnWindowFocus: false
    })
};

export function useJob(jobId: string | null) {
    return useQuery({
        queryKey: ["job", jobId],
        queryFn: () => getJobById(jobId),
        enabled: !!jobId,
        refetchOnWindowFocus: false
    })

};