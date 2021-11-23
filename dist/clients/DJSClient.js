"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DJSClient = void 0;
const BaseClient_1 = require("./BaseClient");
class DJSClient extends BaseClient_1.BaseClient {
    constructor(auth, client, options) {
        if (!auth)
            throw new Error('[Infinity API] Auth Token not found, Please provide or generate a valid Infinity Bots Auth Token');
        if (!client)
            throw new Error('[Infinity API] Client not Found, Please provide a valid Discord.js Client');
        const Discord = require('discord.js');
        if (!(client instanceof Discord.Client))
            throw new Error('[Infinity API] Client is not a Discord.js Client');
        super(auth, options);
        this.client = client;
        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats()
        });
    }
    clientReady() {
        return this.client.ws.status === 0;
    }
    waitForReady(fn) {
        this.client.once('ready', () => {
            fn();
        });
    }
    async getStats() {
        var _a;
        return {
            servers: this.client.guilds.cache.size || 0,
            shards: ((_a = this.client.shard) === null || _a === void 0 ? void 0 : _a.ids[0]) || 0,
        };
    }
}
exports.DJSClient = DJSClient;
