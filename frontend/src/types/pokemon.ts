export interface Pokemon {
    name: string;
    url: string;
    types: Array<{ slot: number; type: { name: string; url: string } }>;
}
