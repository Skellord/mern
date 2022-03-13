import { UnitCaste } from './units.types';

export const ALL_FACTIONS = [
    'cathay',
    'khorn',
    'kislev',
    'nurgle',
    'ogres',
    'slaanesh',
    'tzeentch',
    'beastmens',
    'bretonnia',
    'chaos',
    'dark-elves',
    'dwarfs',
    'empire',
    'greenskins',
    'high-elves',
    'lizardmens',
    'norsca',
    'skavens',
    'tomb-kings',
    'vampire-coast',
    'vampire-counts',
    'wood-elves',
];

export type Factions = typeof ALL_FACTIONS[number];

export interface Faction {
    id: string;
    faction: Factions;
}

export interface FactionUnit {
    _id: string;
    unit: string;
    land_unit: string;
    caste: UnitCaste;
    lord_portrait?: string;
    unit_portrait: string;
    icon: string;
    campaign_exclusive?: string;
    local_name: string;
}

export type FactionWithUnits = Faction & { units: FactionUnit[] };
