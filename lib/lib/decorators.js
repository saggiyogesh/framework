import { HTTP_METHODS, registerRemote, registerService } from './registry.js';
export function Auth() {
    return (target, methodName, descriptor) => {
        console.log('Auth', target, methodName, descriptor);
    };
}
export function Service(path) {
    return (target) => {
        registerService(target, path);
    };
}
export function GET(pathOrRouteOptions) {
    return (target, methodName, descriptor) => {
        registerRemote(methodName, target.constructor.name, HTTP_METHODS.GET, pathOrRouteOptions);
    };
}
export function POST(pathOrRouteOptions) {
    return (target, methodName, descriptor) => {
        registerRemote(methodName, target.constructor.name, HTTP_METHODS.POST, pathOrRouteOptions);
    };
}
export function PATCH(pathOrRouteOptions) {
    return (target, methodName, descriptor) => {
        registerRemote(methodName, target.constructor.name, HTTP_METHODS.PATCH, pathOrRouteOptions);
    };
}
export function PUT(pathOrRouteOptions) {
    return (target, methodName, descriptor) => {
        registerRemote(methodName, target.constructor.name, HTTP_METHODS.PUT, pathOrRouteOptions);
    };
}
export function DELETE(pathOrRouteOptions) {
    return (target, methodName, descriptor) => {
        registerRemote(methodName, target.constructor.name, HTTP_METHODS.DELETE, pathOrRouteOptions);
    };
}
