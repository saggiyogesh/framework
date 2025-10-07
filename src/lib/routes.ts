import { readdir, stat } from 'node:fs/promises';
import { type RouteOptions, type FastifyInstance, type FastifySchema } from 'fastify';
import { getLoggerESM } from 'logger3000';
import { getServices } from './registry.js';

const Log = getLoggerESM(import.meta.url);

function buildURL(name: string, path: string | undefined) {
	let url = path;

	if (url === undefined) {
		url = name;
	}

	if (url !== '') {
		url = `/${url}`;
	}

	return url;
}

export function loadServices(server: FastifyInstance, servicesFolder: string) {
	return async function () {
		console.log('servicesFolder', servicesFolder);

		const dir = await readdir(servicesFolder);

		const promises = dir.map(async (modelName) => {
			const servicePath = `${servicesFolder}/${modelName}`;
			const stats = await stat(servicePath);
			let importString = `file://${servicePath}`;
			if (stats.isDirectory()) {
				importString += '/index.js';
			}

			return import(importString);
		});
		await Promise.all(promises);

		// Bind routes to fastify instance
		for (const [, service] of Object.entries(getServices())) {
			const { name, endpoint, routes, instance } = service;
			for (const [methodName, routeOptions] of Object.entries(routes)) {
				const handler = instance[methodName];

				if (typeof handler !== 'function') {
					throw new TypeError(`Invalid handler for ${name}.${methodName}`);
				}

				// @ts-expect-error
				const { method, path, auth, reqSchema, rawBody, versionPrefix = server.currentApiVersion } = routeOptions;

				console.log('re -- schema --', reqSchema);
				const schema: FastifySchema = {};

				if (reqSchema) {
					schema.body = reqSchema?.properties?.body;
					// Schema.params = reqSchema?.properties?.params;
					// schema.querystring = reqSchema?.properties?.query;
				}

				const route = {
					method,
					url: `/${versionPrefix}/${endpoint}${buildURL(methodName, path)}`,
					handler,
					schema,
				} as any as RouteOptions;
				if (rawBody) {
					route.config = { rawBody: true };
				}

				// @ts-expect-error -  custom onRequestFactory due to which we need to cast
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
				route.onRequest = server.onRequestFactory(auth, method, route.url);

				server.route(route);
			}
		}
	};
}
