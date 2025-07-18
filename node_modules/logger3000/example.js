const { getLogger, setDirs } = require('./');
setDirs('.', '.');

const Log = getLogger(__filename);

Log.info({ msg: 'Activity done', arg1: { user: 'abc', flag: true }, arg2: 60 });

Log.debug({ msg: 'Activity done', arg1: { user: 'abc', flag: true }, arg2: 60 });

const error = new Error('Unhandled Error');
error.statusCode = 400;

Log.error({ msg: 'testing error', error, arg1: { email: 'abc@xyz.com' } });
