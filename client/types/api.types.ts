import { Faction, FactionWithUnits } from './faction.types';
import { UnitWithStats, Unit } from './units.types';

export type FactionsResponse = Faction[];
export type UnitResponse = [UnitWithStats];
export type UnitsResponse = Unit[];
export type FactionsUnitsResponse = FactionWithUnits;
