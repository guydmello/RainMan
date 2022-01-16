import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
const axios = require('axios')
const prefix = '!'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
})

client.on("messageCreate", msg => {
    if(!msg.content.startsWith(prefix)) {
        return
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift()?.toLowerCase()
    console.log(args)

    if (command === "ego") {
        msg.react("😃")
    }

    if (command === 'ping') {
        msg.reply({
            content: 'Don',
        })
    }

    if(command === 'clear') {
        let num = 256
        if (args[0]) {
            num = parseInt(args[0]) + 1
        }
        if (msg.channel.type === "GUILD_TEXT") {
            msg.channel.bulkDelete(num)
            msg.channel.send(`bot deleted ${args[0]} messages for you`)
        }
    }

    if (command === 'capslock') {
        const combinedArgs = args.join(" ")
        msg.channel.send(`${msg.author.username} is angry and has something to say: \n\n ${combinedArgs.toUpperCase()}`)
    }
})

client.login(process.env.TOKEN)