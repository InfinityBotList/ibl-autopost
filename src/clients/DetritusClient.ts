import { BaseClient, BaseClientInterface } from './BaseClient';
import { BotStatistics } from 'infinity-bots/dist/typings';
import { AutoPostOptions } from '../typings';
import { ShardClient } from 'detritus-client';

/**
 * Auto-Poster For Detritus
 */
export class DetritusClient extends BaseClient implements BaseClientInterface {
  private client: ShardClient;

  /**
   * Create a new poster
   * @param token Top.gg API Token
   * @param client Your Detritus ShardClient
   * @param options Options
   */
  constructor(auth: string, client: any, options?: AutoPostOptions) {
    if (!auth)
      throw new Error(
        '[Infinity API] Auth Token not found, Please provide or generate a valid Infinity Bots Auth Token',
      );

    if (!client)
      throw new Error(
        '[Infinity API] Client not Found, Please provide a valid Detritus ShardClient',
      );

    const Discord = require('detritus-client');

    if (!(client instanceof Discord.ShardClient))
      throw new Error('[Infinity API] Client is not a Detritus ShardClient');

    super(auth, options);

    this.client = client;

    this._binder({
      clientReady: () => this.clientReady(),
      waitForReady: (fn) => this.waitForReady(fn),
      getStats: () => this.getStats(),
    });
  }

  public clientReady(): boolean {
    return this.client.ran;
  }

  public waitForReady(fn: () => void) {
    this.client.once('gatewayReady', () => {
      fn();
    });
  }

  public async getStats(): Promise<BotStatistics> {
    return {
      servers: this.client.guilds.size,
      shards: this.client.shardCount,
    };
  }
}
