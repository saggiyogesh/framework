import assert from 'node:assert';
import plur from 'plur';
import { type RouteOptions, type DecoratorTarget } from '../types.js';

type RemoteType = Record<string, Record<string, RouteOptions>>;
type ServiceType = Record<
	string,
	{
		name: string;
		endpoint: string;
		routes: Record<string, RouteOptions>;
		instance: Record<string, unknown>;
	}
>;

const _services = {} as any as ServiceType;
const _remotes: RemoteType = {};

export const HTTP_METHODS = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

export function registerService(Class: DecoratorTarget, path?: string): void {
	const { name } = Class;

	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	const endpoint = plur(path || name.toLowerCase());

	assert(name, 'Rest service name not defined.');
	_services[name] = {
		name,
		endpoint,
		routes: _remotes[name],
		instance: new Class(),
	};

	// Console.log('Registered service:', _services);
}

export function registerRemote(
	handlerMethodName: string,
	className: string,
	httpMethod: string,
	pathOrRouteOptions?: string | RouteOptions,
): void {
	if (!_remotes[className]) {
		_remotes[className] = {};
	}

	const config: RouteOptions = { method: httpMethod };

	if (pathOrRouteOptions && typeof pathOrRouteOptions === 'object') {
		config.path = pathOrRouteOptions.path;
		if (pathOrRouteOptions.auth === true) {
			config.auth = true;
		}

		if (pathOrRouteOptions.reqSchema) {
			config.reqSchema = pathOrRouteOptions.reqSchema;
		}

		if (pathOrRouteOptions.rawBody) {
			config.rawBody = true;
		}
	} else {
		config.path = pathOrRouteOptions;
	}

	_remotes[className][handlerMethodName] = config;

	// Console.log('Registered remote:', _remotes);
}

export function getServices() {
	return Object.freeze(_services);
}
