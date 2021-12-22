# Infinity Auto Post

[![CodeQL](https://github.com/InfinityBotList/ibl-autopost/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/InfinityBotList/ibl-autopost/actions/workflows/codeql-analysis.yml)

The easy way to Post your Bots Server and Shard Count stats.

> Note: This Module will post stats every 5 Minutes

---

## Links

- Docs: [View the Docs](https://docs.botlist.site/libraries/node/#auto-poster)
- Support: [Join our Discord](https://botlist.site/discord)

---


## Supported Librarys
- Discord.js
- Eris

---

## Example
```js
const { InfinityAutoPoster } = require('ibl-autopost')

const poster = InfinityAutoPoster('auth_token', client) // your discord.js or eris client

// Optional Logger
poster.on('posted', (stats) => {

  console.log(`Posted stats to the Infinity Bot List API | ${stats.servers} servers`)

});
```

---

## Example Error
```js
const { InfinityAutoPoster } = require('ibl-autopost')

const poster = InfinityAutoPoster('auth_token', client) // your discord.js or eris client

// Optional Logger
poster.on('error', (err) => {

  console.log(err)
})
```



