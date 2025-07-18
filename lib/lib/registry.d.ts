import { type RouteOptions, type DecoratorTarget } from '../types.js';
type ServiceType = Record<string, {
    name: string;
    endpoint: string;
    routes: Record<string, RouteOptions>;
    instance: Record<string, unknown>;
}>;
export declare const HTTP_METHODS: {
    GET: string;
    PUT: string;
    POST: string;
    PATCH: string;
    DELETE: string;
};
export declare function registerService(Class: DecoratorTarget, path?: string): void;
export declare function registerRemote(handlerMethodName: string, className: string, httpMethod: string, pathOrRouteOptions?: string | RouteOptions): void;
export declare function getServices(): Readonly<ServiceType>;
export {};
