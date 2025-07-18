const path = require('path');
const { fileURLToPath } = require('url');
const assert = require('assert');
const { NODE_ENV, PROD_PRINT_TIMESTAMP = false } = process.env;
const { join, relative } = path;

const isProd = NODE_ENV === 'production';
let printTimestamp = true;
if (isProd) {
  printTimestamp = PROD_PRINT_TIMESTAMP;
}

const pinoOpts = {
  timestamp: printTimestamp,
  level: 'debug'
};

if (!isProd) {
  pinoOpts.transport = {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:standard',
      errorProps: '*'
    }
  };
}

const pino = require('pino')(pinoOpts);

pino.INFO = pino.info;
pino.DEBUG = pino.debug;
pino.ERROR = pino.error;

let _devDir = 'src';
let _prodDir = 'dist';

function toCategory (fileName) {
  const args = [process.cwd()];
  if (isProd) {
    args.push(_prodDir);
  }

  args.push(_devDir);

  return relative(join.apply(path, args), fileName);
}

const _loggerInstances = {};

class Logger {
  constructor (category) {
    this.category = category;
  }

  _getMsg (level, msg) {
    return [level, this.category, msg].join(' - ');
  }

  _log (level, msg = '', arg1, arg2, arg3, arg4, arg5, arg6) {
    msg = this._getMsg(level, msg);

    const logArgs = [{ arg1, arg2, arg3, arg4, arg5, arg6, lvl: level }, msg];
    pino[level](...logArgs);
  }

  /**
   * Usage:
   *    `Log.info({ msg: 'Activity done', arg1: { user: 'abc', flag: true }, arg2: 60 });`
   *
   * Above INFO log be logged as (in production):
   *
   *    `{"level":30,"msg":"INFO - test.js - Activity done","pid":4945,
   *     "hostname":"local","arg1":{"user":"abc","flag":true},"arg2":60,"v":1}`
   *
   * @param {Object} log - Info log object
   * @param {String} log.msg - Message to print in logs
   * @param {*} [log.arg1] - Extra log param
   * @param {*} [log.arg2] - Extra log param
   * @param {*} [log.arg3] - Extra log param
   * @param {*} [log.arg4] - Extra log param
   * @param {*} [log.arg5] - Extra log param
   * @param {*} [log.arg6] - Extra log param
   * @memberof Logger
   */
  info ({ msg, arg1, arg2, arg3, arg4, arg5, arg6 }) {
    this._log('INFO', msg, arg1, arg2, arg3, arg4, arg5, arg6);
  }

  /**
   * Usage:
   *    `Log.debug({ msg: 'Activity done', arg1: { user: 'abc', flag: true }, arg2: 60 });`
   *
   * Above DEBUG log be logged as (in production):
   *
   *    `{"level":30,"msg":"DEBUG - test.js - Activity done","pid":4945,
   *      "hostname":"local","arg1":{"user":"abc","flag":true},"arg2":60,"v":1}`
   *
   *
   * @param {Object} log - Debug log object
   * @param {String} log.msg - Message to print in logs
   * @param {*} [log.arg1] - Extra log param
   * @param {*} [log.arg2] - Extra log param
   * @param {*} [log.arg3] - Extra log param
   * @param {*} [log.arg4] - Extra log param
   * @param {*} [log.arg5] - Extra log param
   * @param {*} [log.arg6] - Extra log param
   * @memberof Logger
   */
  debug ({ msg, arg1, arg2, arg3, arg4, arg5, arg6 }) {
    this._log('DEBUG', msg, arg1, arg2, arg3, arg4, arg5, arg6);
  }

  /**
   * Usage:
   *    `Log.error({msg: 'testing error', error: error, arg1: {email: abc@xyz.com}});`
   *
   * Above ERROR log be logged as (in production):
   *
   *    `{"level":50,"msg":"ERROR - test.js - testing error",
   *      "pid":4584,"hostname":"local","type":"Error","stack":"Error: Unhandled Error\n    at
   *      Object.<anonymous> (/workspace/projects/lil-logger/test.js:6:15)\n
   *      at Module._compile (module.js:635:30)\n    at Object.Module._extensions..js
   *      (module.js:646:10)\n    at Module.load (module.js:554:32)\n
   *      at tryModuleLoad (module.js:497:12)\n    at Function.Module._load (module.js:489:3)\n
   *      at Function.Module.runMain (module.js:676:10)\n    at startup (bootstrap_node.js:187:16)
   *      \n  at bootstrap_node.js:608:3","statusCode":400,"arg1":{"email":"abc@xyz.com"},"v":1}`
   *
   *
   * @param {Object} log - Error log object
   * @param {Error} log.error - Error instance to be logged
   * @param {String} [log.msg] - Message to print in logs
   * @param {*} [log.arg1] - Extra log param
   * @param {*} [log.arg2] - Extra log param
   * @param {*} [log.arg3] - Extra log param
   * @param {*} [log.arg4] - Extra log param
   * @memberof Logger
   */
  error ({ error, msg, arg1, arg2, arg3, arg4 }) {
    assert(error, 'Error instance not exists.');
    msg = this._getMsg('ERROR', msg);
    arg1 && (error.arg1 = arg1);
    arg2 && (error.arg2 = arg2);
    arg3 && (error.arg3 = arg3);
    arg4 && (error.arg4 = arg4);
    pino.error(error, msg);
  }
}

exports.getLogger = fileName => {
  const category = toCategory(fileName);
  let instance;
  if (!_loggerInstances[category]) {
    instance = Object.freeze(new Logger(category));
  }

  _loggerInstances[category] = instance;
  return instance;
};

exports.getLoggerESM = (importMetaURL) => {
  const fileName = fileURLToPath(importMetaURL);
  const category = toCategory(fileName);
  let instance;
  if (!_loggerInstances[category]) {
    instance = Object.freeze(new Logger(category));
  }

  _loggerInstances[category] = instance;
  return instance;
};
/**
 * Configure dev & prod dirs for logging.
 * @param {String} devDir - source dir name for dev usage. Default: `src`
 * @param {String} prodDir - build dir name for prod usage. Default: `dist`
 */
exports.setDirs = (devDir, prodDir) => {
  _devDir = devDir;
  _prodDir = prodDir;
};
