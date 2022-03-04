import { Unit, UnitWithStats } from '../../types/units.types';

export type FactionsResponse = string[];
export type FactionsUnitsResponse = Unit[];
export type UnitResponse = [UnitWithStats];
export type UnitsResponse = Unit[];

export interface FactionUnitsParams {
    faction: string;
}

export interface UnitParams {
    id: string;
}
