import { BaseClient, BaseClientInterface } from './BaseClient';
import { BotStatistics } from 'infinity-bots/dist/typings';
import { Master } from 'discord-rose';
import { AutoPostOptions } from '../typings';

export class RoseClient extends BaseClient implements BaseClientInterface {
    private client: Master

    constructor (auth: string, client: any, options?: AutoPostOptions) {
        if (!auth) throw new Error('[Infinity API] Auth Token not found, Please provide or generate a valid Infinity Bots Auth Token');

        if (!client) throw new Error('[Infinity API] Client not Found, Please provide a valid Eris Client');

        const Discord = require('discord-rose');

        if (!(client instanceof Discord.Master)) throw new Error('[Infinity API] Client is not a valid Discord-Rose Client');

        super(auth, options);

        this.client = client;

        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats()
        });
    }

    public async clientReady () {
        if (!this.client.spawned) return false;

        const stats = await this.client.getStats();

        return stats.every(x => x.shards.every(x => x.state === 2));
    }

    public waitForReady(fn: () => void) {
        this.client.once('READY', () => {
          fn()
        })
      }

      public async getStats (): Promise<BotStatistics> {
        const stats = await this.client.getStats()
        return {
          servers: stats.reduce((a, b) => {
            return a + b.shards.reduce((c, d) => c + d.guilds, 0)
          }, 0),
          shards: this.client.options.shards as number
        }
      }
  }