import { Unit } from './units.types';

export type FactionsResponse = string[];
export type FactionsUnitsResponse = Unit[];

export interface FactionUnitsParams {
    faction: string;
}
