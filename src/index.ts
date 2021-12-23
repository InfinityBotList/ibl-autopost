import { DJSClient } from './clients/DJSClient';
import { ErisClient } from './clients/ErisClient';
import { DetritusClient } from './clients/DetritusClient';
import { BaseClient } from './clients/BaseClient';

import { AutoPostOptions } from './typings'

export function InfinityAutoPoster (auth: string, client: any, options?: AutoPostOptions): BaseClient {

    if (!auth) throw new Error('Invalid Auth Token Provided, Please Generate or Provide a Valid Infinity Bots API Auth Token');

    if (!client) throw new Error('Hmm, Unable to Find a Client. Please provide a valid Discord.js, Detritus or Eris Client');

    let djs;

    try {

        djs = require.cache[require.resolve('discord.js')]

    } catch (err) {}

    let eris;

    try {

        eris = require.cache[require.resolve('eris')]
    } catch (err) {}

    let detritus;

    try {
        detritus = require.cache[require.resolve('detritus-client')]
    } catch (err) {}

    if (djs && client instanceof djs.exports.Client) return new DJSClient(auth, client, options);
    if (eris && client instanceof eris.exports.Client) return new ErisClient(auth, client, options);
    if (detritus && client instanceof detritus.exports.ShardClient) return new DetritusClient(auth, client, options);

    throw new Error('You are using a Unsupported Library. Supported Librarys are Discord.js, Detritus and Eris');
}

export { DJSClient } from './clients/DJSClient';
export { ErisClient } from './clients/ErisClient'
export { DetritusClient} from './clients/DetritusClient';

export default InfinityAutoPoster