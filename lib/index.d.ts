/// <reference types="node" resolution-mode="require"/>
import fastify from 'fastify';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
declare const server: fastify.FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, fastify.FastifyBaseLogger, TypeBoxTypeProvider>;
declare function start(): Promise<void>;
export default server;
export { start };
export { loadServices } from './lib/routes.js';
export { Auth, Service, POST, PUT, PATCH, GET, DELETE } from './lib/decorators.js';
export { throwError, throwValidationError, throwForbiddenError } from './utils/errorUtil.js';
