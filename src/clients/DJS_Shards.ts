import { BaseClient, BaseClientInterface } from './BaseClient';
import { BotStatistics } from 'infinity-bots/dist/typings';
import { ShardingManager } from 'discord.js';
import { AutoPostOptions } from '../typings';

export class DJS_Shards extends BaseClient implements BaseClientInterface {

    private client: ShardingManager

    constructor(auth: string, client: any, options?: AutoPostOptions) {

        if (!auth) throw new Error('[Infinity API] Auth Token not found, Please provide or generate a valid Infinity Bots Auth Token');

        if (!client) throw new Error('[Infinity API] Client not Found, Please provide a valid Discord.js Client');

        const Discord = require('discord.js')

        if (!(client instanceof Discord.ShardingManager)) throw new Error('[Infinity API - Shards] Client is not a Discord.js ShardingManager')

        super(auth, options)

        this.client = client

        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats()
        })
    }

    public clientReady (): boolean {
        return this.client.shards.size > 0 && this.client.shards.every(x => x.ready)
    }

    public waitForReady(fn: () => void) {

        const listener = (shard) => {

            if (shard.id !== (this.client.totalShards as number) - 1) return

            this.client.off('shardCreate', listener)

            shard.once('ready', () => {
                fn()
            })
        }
        this.client.on('shardCreate', listener)
    }

    public async getStats (): Promise<BotStatistics> {

        const response = await this.client.fetchClientValues('guilds.cache.size')
        return {
            servers: response.reduce((a, b) => a + b, 0),
            shards: response.length
        }
    }
}