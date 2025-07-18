export type Constructable<T> = new (...args: any) => T;
export type DecoratorTarget = Constructable<{
    name: string;
}>;
export type ReqSchema = {
    properties: {
        body?: any;
        query?: any;
        headers?: any;
        params?: any;
    };
};
export type RouteOptions = {
    path?: string;
    auth?: boolean;
    reqSchema?: ReqSchema;
    method?: string;
    versionPrefix?: string;
    rawBody?: boolean;
};
