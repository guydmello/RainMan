import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
const axios = require('axios')
const fetch = require('node-fetch')
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

client.on("messageCreate", async msg => {
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
            content: process.env.API_KEY,
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
    if (command === 'weather') {
        let getWeather = async () => {
            let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&appid=${process.env.API_KEY}`)
            let json = await result.json()
            return json
        }
        let weather = await getWeather()

        console.log(weather)    
        msg.channel.send(`Here's Your Weather ${Math.round(weather.main.temp - 273.15)}, but it feels like ${Math.round(weather.main.feels_like - 273.15)}`)
    }
    // if (command === 'weather') {
    //     let getWeather = async () => {
    //         let response = await axios.defualt.get('api.openweathermap.org/data/2.5/weather?q=toronto&appid=3151f2ed2e02e5ae323613f34a00f652')
    //         let weather = response.data
    //         return weather
    //     }
    //     let WeatherValue = await getWeather()
    //     console.log(WeatherValue)
    //     msg.channel.send("hi")
    // }
})

client.login(process.env.TOKEN)


//api.openweathermap.org/data/2.5/weather?q={city name}&appid=process.env.API_KEY