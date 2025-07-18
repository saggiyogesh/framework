import { Auth, GET, POST, Service } from '../../src/lib/decorators.js';
import './schema.js';

type Schema = Record<string, { type?: string; required?: boolean; $ref?: string }>;

const schema: Schema = {
	where: { type: 'object', required: true },
	sort: { type: 'object', required: false },
	fields: { type: 'object', required: false },
	skip: { type: 'number', required: true },
	limit: { type: 'number', required: true },
	searchStr: { type: 'string', required: false },
	searchFields: { type: 'array', required: false },
};

@Service('user')
export class UserService {
	@GET('hello')
	async helloWorld() {
		return { message: 'Hello, world!' };
	}

	// @POST({ auth: true, schema })
	// async login() {
	// 	return { message: 'Login successful!' };
	// }
}
