const API_URL = import.meta.env.VITE_API_URL;

export const getJobs = async () => {
    const response = await fetch(`${API_URL}/jobs`);

    if (!response.ok) {
        throw new Error("Failed to fetch jobs");
    }

    return response.json();
};

export const getJob = async (jobId: string) => {
    const response = await fetch(`${API_URL}/jobs/${jobId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch job");
    }

    return response.json();
};