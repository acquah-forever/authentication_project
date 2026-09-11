import { useQuery } from "@tanstack/react-query";
import { getJobs, getJobById } from "../api/jobs";

/** Fetch and cache the available jobs without refetching on window focus. */
export function useJobs() {
    return useQuery({
        queryKey: ["jobs"],
        queryFn: getJobs,
        refetchOnWindowFocus: false
    })
};

/** Fetch and cache one job when a job ID is selected. */
export function useJob(jobId: string | null) {
    return useQuery({
        queryKey: ["job", jobId],
        queryFn: () => getJobById(jobId),
        enabled: !!jobId,
        refetchOnWindowFocus: false
    })

};
