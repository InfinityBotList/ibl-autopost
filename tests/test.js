const discordToken = process.argv[2]
const iblAuth = 'abcdefghijkl' // unnecessary to debug

const path = require('path')

const { InfinityAutoPoster } = require('..')

function debug (msg) {
  console.debug(`[TEST] ${currentRunning}: ${msg}`)
}

const { InfinityBots } = require('infinity-bots')
const api = new InfinityBots(iblAuth)

api._request = (method, path, body) => {
  debug(`${method} ${path}\n${JSON.stringify(body, null, 2)}`)
}

const DiscordJS = require('discord.js')
const Eris = require('eris')
const DR = require('discord-rose')

const shardCount = Math.floor(Math.random() * 3) + 2

let currentRunning = 'ESTABLISH'
let kill

let poster

debug(`Spawning ${shardCount} shards.`)

const runs = {
  'discord.js': () => {
    const client = new DiscordJS.Client({ shardCount })

    client.on('ready', () => {
      debug('Received READY')
    })

    poster = InfinityAutoPoster(iblAuth, client, { api })

    client.login(discordToken)
    kill = () => {
      poster.stop()
      client.destroy()
    }
  },
  'eris': () => {
    const client = new Eris.Client(discordToken, { maxShards: shardCount })

    poster = InfinityAutoPoster(iblAuth, client, { api })

    client.on('ready', () => {
      debug('Received READY')
    })

    client.connect()
    kill = () => {
      poster.stop()
      client.disconnect()
    }
  },
  'discord.js.traditional': () => {
    const sharder = new DiscordJS.ShardingManager('./tests/base-worker.js', { token: discordToken, totalShards: shardCount, respawn: false })

    debug('Spawning shards, please wait...')
    sharder.spawn().then(() => {
      debug('Received READY from all shards')
      poster.emit('posted')
    })

    kill = () => {
      sharder.shards.forEach(x => x.kill())
    }
  },
  'discord.js.sharder': () => {
    const sharder = new DiscordJS.ShardingManager('./shard-worker.js', { token: discordToken, totalShards: shardCount, respawn: false })

    poster = InfinityAutoPoster(iblAuth, sharder, { api })

    debug('Spawning shards, please wait...')
    sharder.spawn().then(() => {
      debug('Received READY from all shards')
    })

    kill = () => {
      sharder.shards.forEach(x => x.kill())
    }
  },
  'discord-rose': () => {
    const master = new DR.Master(path.resolve(__dirname, './rose-worker.js'), {
      token: discordToken,
      shards: shardCount,
      log: null
    })

    poster = AutoPoster(topggToken, master, { sdk })

    master.start().then(() => {
      debug('Started')
    })

    kill = () => {
      master.clusters.forEach(x => x.kill())
    }
  }
}

const wait = (time) => new Promise(resolve => setTimeout(() => resolve(), time))

async function run () {
  if (process.argv[3]) {
    currentRunning = process.argv[3]
    runs[currentRunning]()
    poster.once('posted', () => {
      return process.exit()
    })
  }
  for (const cur in runs) {
    currentRunning = cur
    debug('Loading')

    runs[cur]()

    await new Promise((r) => poster.on('posted', () => r()))

    debug('Cleaning up')

    await wait(5000)
    kill()
  }

  process.exit()
}

run()