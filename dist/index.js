"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErisClient = exports.DJSClient = exports.InfinityAutoPoster = void 0;
const DJSClient_1 = require("./clients/DJSClient");
const ErisClient_1 = require("./clients/ErisClient");
function InfinityAutoPoster(auth, client, options) {
    if (!auth)
        throw new Error('Woah, Invalid Auth Token Provided, Please Generate or Provide a Valide Infinity Bots API Auth Token');
    if (!client)
        throw new Error('Hmm, Unable to Find a Client. Please provide a valid Discord.js or Eris Client');
    let djs;
    try {
        djs = require.cache[require.resolve('discord.js')];
    }
    catch (err) { }
    let eris;
    try {
        eris = require.cache[require.resolve('eris')];
    }
    catch (err) { }
    if (djs && client instanceof djs.exports.Client)
        return new DJSClient_1.DJSClient(auth, client, options);
    if (eris && client instanceof eris.exports.Client)
        return new ErisClient_1.ErisClient(auth, client, options);
    //if (djs && client instanceof djs.exports.ShardingManager) return new DJS_Shards(auth, client, options)
    throw new Error('Woah, You are using a Unsupported Library. Supported Librarys are Discord.js and Eris');
}
exports.InfinityAutoPoster = InfinityAutoPoster;
var DJSClient_2 = require("./clients/DJSClient");
Object.defineProperty(exports, "DJSClient", { enumerable: true, get: function () { return DJSClient_2.DJSClient; } });
var ErisClient_2 = require("./clients/ErisClient");
Object.defineProperty(exports, "ErisClient", { enumerable: true, get: function () { return ErisClient_2.ErisClient; } });
//export { DJS_Shards } from './clients/DJS_Shards'
exports.default = InfinityAutoPoster;
