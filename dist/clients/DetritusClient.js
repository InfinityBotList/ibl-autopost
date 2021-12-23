"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetritusClient = void 0;
const BaseClient_1 = require("./BaseClient");
class DetritusClient extends BaseClient_1.BaseClient {
    constructor(auth, client, options) {
        if (!auth)
            throw new Error('[Infinity API] Auth Token not found, Please provide or generate a valid Infinity Bots Auth Token');
        if (!client)
            throw new Error('[Infinity API] Client not Found, Please provide a valid Detritus Shard Client');
        const Discord = require('detritus-client');
        if (!(client instanceof Discord.ShardClient))
            throw new Error('[Infinity API] Client is not a Detritus Shard Client');
        super(auth, options);
        this.client = client;
        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats(),
        });
    }
    clientReady() {
        return this.client.ran;
    }
    waitForReady(fn) {
        this.client.once('gatewayReady', () => {
            fn();
        });
    }
    async getStats() {
        return {
            servers: this.client.guilds.size,
            shards: this.client.shardCount,
        };
    }
}
exports.DetritusClient = DetritusClient;
