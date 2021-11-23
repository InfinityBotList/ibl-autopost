import { BaseClient, BaseClientInterface } from './BaseClient';
import { BotStatistics } from 'infinity-bots/dist/typings';
import { AutoPostOptions } from '../typings';

import { Client } from 'discord.js';

export class DJSClient extends BaseClient implements BaseClientInterface {

    private client: Client

    constructor(auth: string, client: any, options?: AutoPostOptions) {

        if (!auth) throw new Error('[Infinity API] Auth Token not found, Please provide or generate a valid Infinity Bots Auth Token');

        if (!client) throw new Error('[Infinity API] Client not Found, Please provide a valid Discord.js Client');

        const Discord = require('discord.js');

        if (!(client instanceof Discord.Client)) throw new Error('[Infinity API] Client is not a Discord.js Client');

        super(auth, options);
        
        this.client = client

        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats()

        })
    }

    public clientReady (): boolean {
        return this.client.ws.status === 0
    }

    public waitForReady (fn: () => void) {
        this.client.once('ready', () => {
            fn()
        })
    }

    public async getStats (): Promise<BotStatistics> {
        return {
            servers: this.client.guilds.cache.size || 0,
            shards: this.client.options.shardCount || 0
        }
    }
}