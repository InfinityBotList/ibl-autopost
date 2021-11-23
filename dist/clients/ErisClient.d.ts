import { BaseClient, BaseClientInterface } from './BaseClient';
import { BotStatistics } from 'infinity-bots/dist/typings';
import { AutoPostOptions } from '../typings';
/**
 * Auto-Poster For Eris
 */
export declare class ErisClient extends BaseClient implements BaseClientInterface {
    private client;
    /**
     * Create a new poster
     * @param token Top.gg API Token
     * @param client Your Eris Client
     * @param options Options
     */
    constructor(auth: string, client: any, options?: AutoPostOptions);
    clientReady(): boolean;
    waitForReady(fn: () => void): void;
    getStats(): Promise<BotStatistics>;
}
