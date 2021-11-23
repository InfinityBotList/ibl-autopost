/// <reference types="node" />
import { EventEmitter } from 'ibl-emitter';
import { BotStatistics } from 'infinity-bots/dist/typings';
import { AutoPostOptions } from '../typings';
export interface BaseClientInterface {
    getStats: () => Promise<BotStatistics>;
    clientReady: () => boolean | Promise<boolean>;
    waitForReady: (fn: () => void) => void;
}
export declare class BaseClient extends EventEmitter<{
    posted: BotStatistics;
    error: Error;
}> {
    private options;
    private binds;
    private api;
    started: boolean;
    interval: NodeJS.Timeout;
    constructor(auth: string, options?: AutoPostOptions);
    _binder(binds: BaseClientInterface): Promise<void>;
    start(): void;
    private _setupInterval;
    post(): Promise<void>;
}
