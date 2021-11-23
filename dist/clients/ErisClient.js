"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErisClient = void 0;
const BaseClient_1 = require("./BaseClient");
/**
 * Auto-Poster For Eris
 */
class ErisClient extends BaseClient_1.BaseClient {
    /**
     * Create a new poster
     * @param token Top.gg API Token
     * @param client Your Eris Client
     * @param options Options
     */
    constructor(auth, client, options) {
        if (!auth)
            throw new Error('[Infinity API] Auth Token not found, Please provide or generate a valid Infinity Bots Auth Token');
        if (!client)
            throw new Error('[Infinity API] Client not Found, Please provide a valid Eris Client');
        const Discord = require('eris');
        if (!(client instanceof Discord.Client))
            throw new Error('[Infinity API] Client is not a Eris Client');
        super(auth, options);
        this.client = client;
        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats()
        });
    }
    clientReady() {
        return this.client.ready;
    }
    waitForReady(fn) {
        this.client.once('ready', () => {
            fn();
        });
    }
    async getStats() {
        return {
            servers: this.client.guilds.size,
            shards: this.client.options.maxShards
        };
    }
}
exports.ErisClient = ErisClient;
