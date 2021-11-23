const { Client } = require('discord.js')

const client = new Client()

const { InfinityBots } = require('infinity-bots')
const ibl = new InfinityBots('client')

ibl._request = (method, path, body) => {
  console.log(method, path, body)
}

const { AutoPoster } = require('..')
AutoPoster('client', client, {
  api: ibl
})

client.login()