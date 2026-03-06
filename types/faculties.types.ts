type Faculty = {
    id: number,
    name: string,
    code: string,
    university_id: string,
    created_at: string,
    updated_at: string
}

type GetFacultiesParams = {
    university_id?: string;
    name?: string;
    code?: string;
}


type GetFacultiesResponse = {
    faculties: Faculty[]
}

export type { Faculty, GetFacultiesParams, GetFacultiesResponse };
