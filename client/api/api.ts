import {
    FactionsResponse,
    FactionsUnitsResponse,
    FactionUnitsParams,
    UnitParams,
    UnitResponse,
    UnitsResponse,
} from '../types/api.types';
import { apiRoutes } from '../utils/api.util';
import fetcher from './fetcher';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

class Client {
    headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    getFactions() {
        return fetcher<FactionsResponse>(`${BASE_URL}${apiRoutes.getFactions}`, { headers: this.headers });
    }

    getFaсtionUnits(params: FactionUnitsParams) {
        return fetcher<FactionsUnitsResponse>(`${BASE_URL}${apiRoutes.getFactions}/${params.faction}`, {
            headers: this.headers,
        });
    }

    getUnit(params: UnitParams) {
        return fetcher<UnitResponse>(`${BASE_URL}${apiRoutes.getUnit}${params.id}`, { headers: this.headers });
    }

    getUnitStats(params: UnitParams) {
        return fetcher<UnitResponse>(`${BASE_URL}${apiRoutes.getUnit}${params.id}/stats`, { headers: this.headers });
    }

    getUnits() {
        return fetcher<UnitsResponse>(`${BASE_URL}${apiRoutes.getUnits}`, { headers: this.headers });
    }
}

const client = new Client();

export { client };
