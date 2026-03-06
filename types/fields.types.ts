// department_id

export type Field = {

    id: number;
    name: string;
    code: string;
    academic_system: string;
    department_id: number;
    created_at: string;
    updated_at: string;

}

export type GetFieldsParams = {
    department_id?: number;
    name?: string;
    code?: string;
}

export type GetFieldsResponse = {
    fields: Field[];
}