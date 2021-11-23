import { BaseClient, BaseClientInterface } from './BaseClient';
import { BotStatistics } from 'infinity-bots/dist/typings';
import { AutoPostOptions } from '../typings';
export declare class DJSClient extends BaseClient implements BaseClientInterface {
    private client;
    constructor(auth: string, client: any, options?: AutoPostOptions);
    clientReady(): boolean;
    waitForReady(fn: () => void): void;
    getStats(): Promise<BotStatistics>;
}
