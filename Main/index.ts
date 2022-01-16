import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const axios = require('axios')
const fetch = require('node-fetch')
const prefix = '!'
const Default_Cities = ['toronto', 'missisuagua', 'brampton', 'vaughan']
const { MessageEmbed } = require('discord.js');

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
    // console.log(args)

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
    if (command === 'weather' && args[0]) {
        let getWeather = async () => {
            let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=${process.env.API_KEY}`)
            let json = await result.json()
            return json
        }
        let weather = await getWeather() 
        console.log(weather.coord.lon)
        const weatherEmbed = {
            color: 0x0099ff,
            title: 'Weather',
            url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            author: {
                name: 'RainMan',
                icon_url: `http://openweathermap.org/img/w/${weather.weather.icon}.png`,
                url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            },
            description: 'Some description here',
            thumbnail: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            fields: [
                {
                    name: 'Regular field title',
                    value: 'Some value here',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
            ],
            image: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            timestamp: new Date(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
            },
        };
        // msg.channel.send(`Here's Your Weather ${Math.floor(weather.main.temp)}, but it feels like ${Math.floor(weather.main.feels_like)} and 
        // ${weather.weather.icon}`)
        msg.channel.send({ embeds: [weatherEmbed] })

        //http://openweathermap.org/img/w/10d.png
        // msg.channel.send(`Here's Your Weather ${Math.round(weather.main.temp - 273.15)}, but it feels like ${Math.round(weather.main.feels_like - 273.15)}`)
    } else if (command === 'weather' && !args[0]) {
        // let getWeather = async () => {
        //     let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=${process.env.API_KEY}`)
        //     let json = await result.json()
        //     return json
        // }
        // let weather = await getWeather() 
        // msg.channel.send(`Here's Your Weather ${Math.floor(weather.main.temp)}, but it feels like ${Math.floor(weather.main.feels_like)} and 
        // ${weather.weather.icon}`)


        const City_Data = []
        for (let i = 0; i < Default_Cities.length; i++) {
            console.log (Default_Cities[i]);
            let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=${process.env.API_KEY}`)
            let json = await result.json()
            City_Data.push(json)
          }
        console.log(City_Data)
        console.log(Default_Cities)
    }

    if(command === "test") {
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'Weather',
            url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            author: {
                name: 'RainMan',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
                url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            },
            description: 'Some description here',
            thumbnail: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            fields: [
                {
                    name: 'Regular field title',
                    value: 'Some value here',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
            ],
            image: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            timestamp: new Date(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
            },
        };
        msg.channel.send({ embeds: [exampleEmbed] });
    }
})

client.login(process.env.TOKEN)


//api.openweathermap.org/data/2.5/weather?q={city name}&appid=process.env.API_KEY