import { InfinityBots } from 'infinity-bots';

export interface AutoPostOptions {
    /**
     * Interval of time to Post Stats
     * @default 300000
     */
    interval?: number,

    /**
     * Post when the Interval Starts (true or false)
     * @default false
     */
    postAtInterval?: boolean

    /**
     * Begin Posting Immediately
     */
    startNow?: boolean

    /**
     * Rando Stuff
     */
    api?: InfinityBots
}