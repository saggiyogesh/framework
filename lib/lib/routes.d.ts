import { type FastifyInstance } from 'fastify';
export declare function loadServices(server: FastifyInstance, servicesFolder: string): () => Promise<void>;
