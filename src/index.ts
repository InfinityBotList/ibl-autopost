import { DJSClient } from './clients/DJSClient';
import { ErisClient } from './clients/ErisClient';
//import { DJS_Shards } from './clients/DJS_Shards';

import { BaseClient } from './clients/BaseClient';

import { AutoPostOptions } from './typings'

export function InfinityAutoPoster (auth: string, client: any, options?: AutoPostOptions): BaseClient {

    if (!auth) throw new Error('Woah, Invalid Auth Token Provided, Please Generate or Provide a Valide Infinity Bots API Auth Token');

    if (!client) throw new Error('Hmm, Unable to Find a Client. Please provide a valid Discord.js or Eris Client');

    let djs;

    try {

        djs = require.cache[require.resolve('discord.js')]

    } catch (err) {}

    let eris;

    try {

        eris = require.cache[require.resolve('eris')]
    } catch (err) {}

    if (djs && client instanceof djs.exports.Client) return new DJSClient(auth, client, options)
    if (eris && client instanceof eris.exports.Client) return new ErisClient(auth, client, options)
    //if (djs && client instanceof djs.exports.ShardingManager) return new DJS_Shards(auth, client, options)

    throw new Error('Woah, You are using a Unsupported Library. Supported Librarys are Discord.js and Eris');
}

export { DJSClient } from './clients/DJSClient';
export { ErisClient } from './clients/ErisClient'
//export { DJS_Shards } from './clients/DJS_Shards'

export default InfinityAutoPoster