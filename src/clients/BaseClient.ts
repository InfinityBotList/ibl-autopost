import { InfinityBots } from 'infinity-bots'
import { EventEmitter } from '@jpbberry/typed-emitter'

import { BotStatistics } from 'infinity-bots/dist/typings'

import { AutoPostOptions } from '../typings'

export interface BaseClientInterface {
    getStats: () => Promise<BotStatistics>
    clientReady: () => boolean | Promise<boolean>
    waitForReady: (fn: () => void) => void
}

export class BaseClient extends EventEmitter<{
    posted: BotStatistics,
    error: Error
}> {
    private options: AutoPostOptions
    private binds: BaseClientInterface
    private api: InfinityBots

    public started: boolean
    public interval: NodeJS.Timeout

    constructor(auth: string, options?: AutoPostOptions) {
        super()
        this.options = options
        this.started = false

        if (!options) options = {}

        this.options = {
            interval: options.interval ?? 300000,
            postAtInterval: options.postAtInterval ?? true,
            startNow: options.startNow ?? true,
            api: options.api
        }

        if (this.options.interval < 300000) {
            throw new Error('[Infinity API] Interval for Auto Post should be more then 300000 (5 Minutes)');
        }

        this.api = this.options.api || new InfinityBots(auth);
    }

    public async _binder (binds: BaseClientInterface) {

        this.binds = binds

        if (this.options.startNow) {

            if (await this.binds.clientReady()) this.start()

            else this.binds.waitForReady(() => {
                this.start()
            })
        }
    }

    public start () {

        this.started = true

        this._setupInterval()
    }

    private _setupInterval () {

        if (this.options.postAtInterval) {

            setTimeout(() => {
                this.post()
            }, 5000)
        }
        this.interval = setInterval(async () => {

            if (!(await this.binds.clientReady())) return

            this.post()

        }, this.options.interval)
    }

    public async post () {
        this.api.postBotStats(await this.binds.getStats())
          .then((data) => this.emit('posted', data))
          .catch((err) => this.eventNames().includes('error')
            ? this.emit('error', err)
            : console.error(err)
          )
    }
}
