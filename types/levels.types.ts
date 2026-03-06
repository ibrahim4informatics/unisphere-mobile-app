export type Level = {
    id: number;
    name: string;
    cycle: string;
    is_final: boolean;
    field_id: number;
    created_at: string;
    updated_at: string;
}

export type GetLevelsResponse = {
    levels: Level[];
}

export type GetLevelParams = {
    name?: string;
    field_id?: number;
    is_final?: boolean;
    cycle?: string;
}