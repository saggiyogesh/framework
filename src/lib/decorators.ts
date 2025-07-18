import { type FastifyInstance } from 'fastify';
import { type RouteOptions, type DecoratorTarget as DecoratorClassTarget } from '../types.js';
import { HTTP_METHODS, registerRemote, registerService } from './registry.js';

export function Auth(): MethodDecorator {
	return (target, methodName, descriptor) => {
		console.log('Auth', target, methodName, descriptor);
	};
}

export function Service(path?: string): ClassDecorator {
	return (target) => {
		registerService(target as any as DecoratorClassTarget, path);
	};
}

export function GET(pathOrRouteOptions?: string | RouteOptions): MethodDecorator {
	return (target, methodName, descriptor) => {
		registerRemote(methodName as string, target.constructor.name, HTTP_METHODS.GET, pathOrRouteOptions);
	};
}

export function POST(pathOrRouteOptions?: string | RouteOptions): MethodDecorator {
	return (target, methodName, descriptor) => {
		registerRemote(methodName as string, target.constructor.name, HTTP_METHODS.POST, pathOrRouteOptions);
	};
}

export function PATCH(pathOrRouteOptions?: string | RouteOptions): MethodDecorator {
	return (target, methodName, descriptor) => {
		registerRemote(methodName as string, target.constructor.name, HTTP_METHODS.PATCH, pathOrRouteOptions);
	};
}

export function PUT(pathOrRouteOptions?: string | RouteOptions): MethodDecorator {
	return (target, methodName, descriptor) => {
		registerRemote(methodName as string, target.constructor.name, HTTP_METHODS.PUT, pathOrRouteOptions);
	};
}

export function DELETE(pathOrRouteOptions?: string | RouteOptions): MethodDecorator {
	return (target, methodName, descriptor) => {
		registerRemote(methodName as string, target.constructor.name, HTTP_METHODS.DELETE, pathOrRouteOptions);
	};
}
