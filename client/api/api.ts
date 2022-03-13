import { FactionsResponse, FactionsUnitsResponse, UnitResponse, UnitsResponse } from '../types/api.types';
import { apiRoutes } from '../utils/api.util';
import fetcher from './fetcher';
import { Localization } from '../../types/localization.types';
import { UnitWithStats } from '../../types/units.types';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

class Client {
    headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    getFactions() {
        return fetcher<FactionsResponse>(`${BASE_URL}${apiRoutes.getFactions}`, { headers: this.headers });
    }

    getFaсtionUnits(params: { faction: string }) {
        return fetcher<FactionsUnitsResponse>(`${BASE_URL}${apiRoutes.getFactions}/${params.faction}`, {
            headers: this.headers,
        });
    }

    getUnit(params: { id: string }) {
        return fetcher<UnitResponse>(`${BASE_URL}${apiRoutes.getUnit}${params.id}`, { headers: this.headers });
    }

    getUnitStats(params: { id: string }) {
        return fetcher<UnitWithStats>(`${BASE_URL}${apiRoutes.getUnit}${params.id}/stats`, { headers: this.headers });
    }

    getUnits() {
        return fetcher<UnitsResponse>(`${BASE_URL}${apiRoutes.getUnits}`, { headers: this.headers });
    }

    getHistoricalDesc(params: { key: string }) {
        return fetcher<Localization>(`${BASE_URL}${apiRoutes.getHistoricalDesc}/${params.key}`, {
            headers: this.headers,
        });
    }
}

const client = new Client();

export { client };
