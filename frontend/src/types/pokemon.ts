export interface Pokemon {
    name: string;
    url: string;
    types: Array<{ slot: number; type: { name: string; url: string } }>;
    abilities: Array<{ ability: { name: string; url: string } }>;
    selectedAbility?: string;
    heldItem?: string | null;
    nature?: string;
    moves?: string[];
}
