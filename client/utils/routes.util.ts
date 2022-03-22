import { Route } from '../types/routes.types';

export const mainRoute: Route = {
    name: 'main',
    href: '/',
};

export const unitsRoute: Route = {
    name: 'factions',
    href: '/factions',
};

export const releasesRoute: Route = {
    name: 'releases',
    href: '/releases',
};

export const mainNavRoutes: Route[] = [mainRoute, unitsRoute, releasesRoute];
