export function getLogger(fileName: string): Readonly<Logger>;
export function getLoggerESM(importMetaURL: string): Readonly<Logger>;
export function setDirs(devDir: string, prodDir: string): void;
declare class Logger {
    constructor(category: string);
    category: string;
    _getMsg(level: string, msg: string): string;
    _log(level: string, msg: string, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any): void;
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
    info({ msg, arg1, arg2, arg3, arg4, arg5, arg6 }: {
        msg: string;
        arg1?: any;
        arg2?: any;
        arg3?: any;
        arg4?: any;
        arg5?: any;
        arg6?: any;
    }): void;
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
    debug({ msg, arg1, arg2, arg3, arg4, arg5, arg6 }: {
        msg: string;
        arg1?: any;
        arg2?: any;
        arg3?: any;
        arg4?: any;
        arg5?: any;
        arg6?: any;
    }): void;
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
    error({ error, msg, arg1, arg2, arg3, arg4 }: {
        error: Error;
        msg?: string;
        arg1?: any;
        arg2?: any;
        arg3?: any;
        arg4?: any;
    }): void;
}
export {};
