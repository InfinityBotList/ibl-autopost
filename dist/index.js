"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetritusClient = exports.ErisClient = exports.DJSClient = exports.InfinityAutoPoster = void 0;
const DJSClient_1 = require("./clients/DJSClient");
const ErisClient_1 = require("./clients/ErisClient");
const DetritusClient_1 = require("./clients/DetritusClient");
function InfinityAutoPoster(auth, client, options) {
    if (!auth)
        throw new Error('Invalid Auth Token Provided, Please Generate or Provide a Valid Infinity Bots API Auth Token');
    if (!client)
        throw new Error('Hmm, Unable to Find a Client. Please provide a valid Discord.js, Detritus or Eris Client');
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
    let detritus;
    try {
        detritus = require.cache[require.resolve('detritus-client')];
    }
    catch (err) { }
    if (djs && client instanceof djs.exports.Client)
        return new DJSClient_1.DJSClient(auth, client, options);
    if (eris && client instanceof eris.exports.Client)
        return new ErisClient_1.ErisClient(auth, client, options);
    if (detritus && client instanceof detritus.exports.Client)
        return new DetritusClient_1.DetritusClient(auth, client, options);
    throw new Error('You are using a Unsupported Library. Supported Librarys are Discord.js, Detritus and Eris');
}
exports.InfinityAutoPoster = InfinityAutoPoster;
var DJSClient_2 = require("./clients/DJSClient");
Object.defineProperty(exports, "DJSClient", { enumerable: true, get: function () { return DJSClient_2.DJSClient; } });
var ErisClient_2 = require("./clients/ErisClient");
Object.defineProperty(exports, "ErisClient", { enumerable: true, get: function () { return ErisClient_2.ErisClient; } });
var DetritusClient_2 = require("./clients/DetritusClient");
Object.defineProperty(exports, "DetritusClient", { enumerable: true, get: function () { return DetritusClient_2.DetritusClient; } });
exports.default = InfinityAutoPoster;
