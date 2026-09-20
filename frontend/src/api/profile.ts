const API_URL = import.meta.env.VITE_API_URL;

export interface Profile {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  country: string;
  organization: string;
  education: string;
  industry: string;
  phoneNumber: string;
  website: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProfileInput = Omit<Profile, "_id" | "user" | "createdAt" | "updatedAt">;

export async function getProfile(): Promise<Profile | null> {
    const response = await fetch(`${API_URL}/profile`, {
        credentials: "include",
    });

        if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }

    return response.json()
}

export async function createProfile(data: ProfileInput): Promise<Profile> {
    const response = await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create profile");
    }

    return response.json()
}

export async function updateProfile(id: string, data: ProfileInput): Promise<Profile> {
    const response = await fetch(`${API_URL}/profile/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update profile");
    }

    return response.json()
}