export const ALL_FACTIONS = ['cathay', 'khorn', 'kislev'];

export type Factions = typeof ALL_FACTIONS[number];

export interface Faction {
    id: string;
    faction: Factions;
}

export interface FactionUnit {
    _id: string;
    unit: string;
    land_unit: string;
    caste: string;
    lord_portrait?: string;
    unit_portrait: string;
    icon: string;
    campaign_exclusive?: string;
}

export type FactionWithUnits = Faction & { units: FactionUnit[] };
