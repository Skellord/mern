import { Route } from '../types/routes.types';

export const mainRoute: Route = {
    name: 'Main',
    href: '/',
};

export const unitsRoute: Route = {
    name: 'Factions',
    href: '/factions',
};

export const mainNavRoutes: Route[] = [mainRoute, unitsRoute];
