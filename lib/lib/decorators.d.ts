import { type RouteOptions } from '../types.js';
export declare function Auth(): MethodDecorator;
export declare function Service(path?: string): ClassDecorator;
export declare function GET(pathOrRouteOptions?: string | RouteOptions): MethodDecorator;
export declare function POST(pathOrRouteOptions?: string | RouteOptions): MethodDecorator;
export declare function PATCH(pathOrRouteOptions?: string | RouteOptions): MethodDecorator;
export declare function PUT(pathOrRouteOptions?: string | RouteOptions): MethodDecorator;
export declare function DELETE(pathOrRouteOptions?: string | RouteOptions): MethodDecorator;
