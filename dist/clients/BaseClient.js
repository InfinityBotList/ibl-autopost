"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const infinity_bots_1 = require("infinity-bots");
const ibl_emitter_1 = require("ibl-emitter");
class BaseClient extends ibl_emitter_1.EventEmitter {
    constructor(auth, options) {
        var _a, _b, _c;
        super();
        this.options = options;
        this.started = false;
        if (!options)
            options = {};
        this.options = {
            interval: (_a = options.interval) !== null && _a !== void 0 ? _a : 300000,
            postAtInterval: (_b = options.postAtInterval) !== null && _b !== void 0 ? _b : true,
            startNow: (_c = options.startNow) !== null && _c !== void 0 ? _c : true,
            api: options.api
        };
        if (this.options.interval < 300000) {
            throw new Error('[Infinity API] Interval for Auto Post should be more then 300000 (5 Minutes)');
        }
        this.api = this.options.api || new infinity_bots_1.InfinityBots(auth);
    }
    async _binder(binds) {
        this.binds = binds;
        if (this.options.startNow) {
            if (await this.binds.clientReady())
                this.start();
            else
                this.binds.waitForReady(() => {
                    this.start();
                });
        }
    }
    start() {
        this.started = true;
        this._setupInterval();
    }
    _setupInterval() {
        if (this.options.postAtInterval) {
            setTimeout(() => {
                this.post();
            }, 5000);
        }
        this.interval = setInterval(async () => {
            if (!(await this.binds.clientReady()))
                return;
            this.post();
        }, this.options.interval);
    }
    async post() {
        this.api.postBotStats(await this.binds.getStats())
            .then((data) => this.emit('posted', data))
            .catch((err) => this.eventNames().includes('error')
            ? this.emit('error', err)
            : console.error(err));
    }
}
exports.BaseClient = BaseClient;
