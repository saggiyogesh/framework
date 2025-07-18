export const userSchema = {
	type: 'object',
	properties: {
		_id: { type: 'string' },
		email: { type: 'string' },
		password: { type: 'string' },
		firstName: { type: 'string' },
		lastName: { type: 'string' },
		role: { type: 'string' },
		createdAt: { type: 'string' },
		updatedAt: { type: 'string' },
	},
};

export const userSchemaCreate = {
	type: 'object',
	properties: {
		email: { type: 'string' },
		password: { type: 'string' },
		firstName: { type: 'string' },
		lastName: { type: 'string' },
		role: { type: 'string' },
	},
	required: ['email', 'password', 'firstName', 'lastName', 'role'],
};
