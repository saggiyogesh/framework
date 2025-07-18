import fastify from 'fastify';
import fastifyBlipp from 'fastify-blipp';
import fastifyJWT from '@fastify/jwt';
import { getLoggerESM } from 'logger3000';
import cors from '@fastify/cors';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { loadServices } from './lib/routes.js';
import { type AppError } from './utils/errorUtil.js';
import { AddressInfo } from 'net';

const Log = getLoggerESM(import.meta.url);

const { PORT, NODE_ENV, TOKEN_SECRET = '' } = process.env;

const server = fastify({
	logger: true,
	// eslint-disable-next-line unicorn/numeric-separators-style
	bodyLimit: 1048576 * 20,
	ignoreTrailingSlash: false,
	trustProxy: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const isDev = NODE_ENV !== 'production';

if (TOKEN_SECRET) {
	await server.register(fastifyJWT, {
		secret: TOKEN_SECRET,
	});
}

if (isDev) {
	await server.register(cors, {});

	await server.register(fastifyBlipp);
}

await server.register(import('fastify-raw-body'), { global: false });

server.decorate('onRequestFactory', (auth: string, method: string, path: string) => {
	return async () => {
		Log.debug({ msg: `onRequest: ${method} ${path}`, arg1: { auth } });
	};
});

server.decorate('currentApiVersion', 'v1');

// eslint-disable-next-line @typescript-eslint/no-floating-promises
server.register(loadServices(server, `${process.cwd()}/${isDev ? 'src' : 'dist'}/services`));

server.addSchema({
	$id: 'non-empty-string',
	type: 'string',
	minLength: 1,
});

server.setErrorHandler(async function (error: AppError, req, reply) {
	// Log error
	this.log.error(error);

	if ((error?.stack ?? '').includes('MongoServerSelectionError')) {
		console.log('Exiting process');
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}

	if (error.payload) {
		const errObj = { ...error, message: error.message, statusCode: error.status, error: error.name };
		await reply.status(error.status).send(errObj);
	} else {
		await reply.status(error.status).send(error);
	}

	// Send error response
});

const port = Number.parseInt(PORT ?? '0', 10) || 8001;

async function start(): Promise<void> {
	try {
		await server.listen({ port, host: '0.0.0.0' });

		Log.debug({ msg: `server listening on ${(server?.server?.address() as AddressInfo)?.port}` });
		if (isDev) {
			server.blipp();
		}
	} catch (error) {
		Log.error({ error: error as Error });
	}
}

export default server;
export { start };
export { loadServices } from './lib/routes.js';
export { Auth, Service, POST, PUT, PATCH, GET, DELETE } from './lib/decorators.js';

export { throwError, throwValidationError, throwForbiddenError } from './utils/errorUtil.js';
