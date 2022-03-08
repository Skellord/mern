import { Unit, UnitWithStats } from '../../types/units.types';
import { Faction, FactionWithUnits } from '../../types/faction.types';

export type FactionsResponse = Faction[];
export type FactionsUnitsResponse = FactionWithUnits;
export type UnitResponse = [UnitWithStats];
export type UnitsResponse = Unit[];
