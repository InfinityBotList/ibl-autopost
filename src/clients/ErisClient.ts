import { BaseClient, BaseClientInterface } from './BaseClient'
import { BotStatistics } from 'infinity-bots/dist/typings'
import { AutoPostOptions } from '../typings'
import { Client } from 'eris'

export class ErisClient extends BaseClient implements BaseClientInterface {
  private client: Client

  constructor (auth: string, client: any, options?: AutoPostOptions) {

    if (!auth) throw new Error('[Infinity API] Auth Token not found, Please provide or generate a valid Infinity Bots Auth Token');

    if (!client) throw new Error('[Infinity API] Client not Found, Please provide a valid Eris Client');

    const Discord = require('eris')

    if (!(client instanceof Discord.Client)) throw new Error('[Infinity API] Client is not a Eris Client')

    super(auth, options)

    this.client = client

    this._binder({
      clientReady: () => this.clientReady(),
      waitForReady: (fn) => this.waitForReady(fn),
      getStats: () => this.getStats()
    })
  }

  public clientReady (): boolean {
    return this.client.ready
  }

  public waitForReady(fn: () => void) {
    this.client.once('ready', () => {
      fn()
    })
  }

  public async getStats (): Promise<BotStatistics> {
    return {
      servers: this.client.guilds.size,
      shards: this.client.options.maxShards as number
    }
  }
}