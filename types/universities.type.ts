export type University = {
    id: string;
    name: string;
    short_name: string;
    city: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    created_at: string;
    updated_at: string;
}
export type GetUniversitiesResponse = {
    universities: University[];
}

export type GetUniveristiesParams = {
    name?: string;
    city?: string;
    short_name?: string;
}