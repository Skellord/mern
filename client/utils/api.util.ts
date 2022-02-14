export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const fetcher = (...args: [input: RequestInfo, init?: RequestInit]) => fetch(...args).then(res => res.json());

export const apiRoutes = {
    factions: '/units/factions',
};
