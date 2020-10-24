const { Telegraf } = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const ScryptaCore = require('@scrypta/core')
const scrypta = new ScryptaCore
scrypta.staticnodes = true

bot.start((ctx) => {
    ctx.reply('Welcome')
})

bot.help((ctx) => {
    ctx.reply('Send me a sticker')
})
bot.hears(/check(.*)/, async (ctx) => {
    let sidechain = await scrypta.get('/sidechain/check' + ctx.match[1] + '/true')
    let reply = ''
    try {
        reply += sidechain.sidechain.name + '\n'
        reply += 'Verified: ' + sidechain.verified + '\n'
        reply += 'User count: ' + sidechain.user_count + '\n'
        reply += 'CAP: ' + sidechain.cap + ' ' + sidechain.sidechain.symbol + '\n'
        reply += 'Consensus: ' + sidechain.consensus + ' (' + sidechain.reliability + '%)'
        ctx.reply(reply)
    } catch (e) {
        ctx.reply('Something goes wrong!')
    }
})

try {
    bot.launch()
    console.log('BOT LISTENING')
} catch (e) {
    console.log('CAN\'T RUN BOT')
}