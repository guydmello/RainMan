import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const axios = require('axios')
const fetch = require('node-fetch')
const prefix = '!'
const Default_Cities = ['toronto', 'mississauga', 'brampton', 'vaughan']
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
    function time_convert(t: number){
        var date = new Date(t * 1000)
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
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
        console.log(weather)
        if (weather.cod === "404"){
            msg.channel.send("City not found!")
            return
        }else{
        const weatherEmbed = {
            color: 0x0099ff,
            title: `Weather for ${weather.name}, ${weather.sys.country}`,
            author: {
                name: 'RainMan',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
                url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            },
            thumbnail: {
                url: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
            },
            fields: [
                {
                    name: ':thermometer: Temprature:',
                    value: `${Math.floor(weather.main.temp)}°c`,
                },
                {
                    name: ':face_in_clouds: Feels Like:',
                    value: `${Math.floor(weather.main.feels_like)}°c`,
                },
                {
                    name: ':telescope: Description:',
                    value: `${weather.weather[0].description}`,
                },
                {
                    name: ':small_red_triangle: Max:',
                    value: `${Math.floor(weather.main.temp_max)}`,
                },
                {
                    name: ':small_red_triangle_down: Min:',
                    value: `${Math.floor(weather.main.temp_min)}`,
                },
                {
                    name: ':dash: Wind:',
                    value: 'In Three Categories:',
                },
                {
                    name: 'Speed:',
                    value: `${weather.wind.speed}m/s`,
                    inline: true,
                },
                {
                    name: 'Gust:',
                    value: `${weather.wind.gust}m/s`,
                    inline: true,
                },
                {
                    name: 'Degree:',
                    value: `${weather.wind.deg}°`,
                    inline: true,
                },
                // {
                //     name: '\u200b',
                //     value: '\u200b',
                //     inline: false,
                // },
                {
                    name: ':hot_face: Humidity:',
                    value: `${weather.main.humidity}%`,
                    inline: true,
                },
                {
                    name: ':sunrise: Sunrise',
                    value: `${time_convert(weather.sys.sunrise)}`,
                    inline: true,
                },
                {
                    name: ':city_sunset: Sunset',
                    value: `${time_convert(weather.sys.sunset)}`,
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
    }

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
            let getWeather = async () => {
                // console.log (Default_Cities[i]);
                let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Default_Cities[i]}&units=metric&appid=${process.env.API_KEY}`)
                let json = await result.json()
                return json
            }
            let weather = await getWeather()
            City_Data.push([weather.name, weather.main.temp, weather.main.feels_like, weather.weather[0].description])
        }
        
        // console.log(City_Data)
        
        // for (let i = 0; i < City_Data.length; i++) {
        //     msg.channel.send(`${City_Data[i][0]}, ${City_Data[i][1]}, ${City_Data[i][2]}`)
        // }
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'Weather',
            url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            author: {
                name: 'RainMan',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
                url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            },
            // description: 'Some description here',
            // thumbnail: {
            //     url: 'https://i.imgur.com/AfFp7pu.png',
            // },
            fields: [
                {
                    name: 'Location:',
                    value: `:pushpin: ${City_Data[0][0]}\n\n:pushpin: ${City_Data[1][0]}\n\n:pushpin: ${City_Data[2][0]}\n\n:pushpin: ${City_Data[3][0]}`,
                    inline: true,
                },
                {
                    name: 'Temperature:',
                    value: `:thermometer: ${City_Data[0][1]}\n\n:thermometer: ${City_Data[1][1]}\n\n:thermometer: ${City_Data[2][1]}\n\n:thermometer: ${City_Data[3][1]}`,
                    inline: true,
                },
                {
                    name: 'Feels like:',
                    value: `:face_in_clouds: ${City_Data[0][3]}\n\n:face_in_clouds: ${City_Data[1][3]}\n\n:face_in_clouds: ${City_Data[2][3]}\n\n:face_in_clouds: ${City_Data[3][3]}`,
                    inline: true,
                },
                
            ],
            timestamp: new Date(),
            footer: {
                text: 'Weather provided by RainMan',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
            },
        };
        msg.channel.send({ embeds: [exampleEmbed] });

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
                {
                    name: 'test1' ,
                    value: "```TESTING```",
                    inline: true,
                  },
                  {
                     name: 'test2' ,
                     value: "```TESTING```",
                     inline: true,
                   },
                   {
                     name: 'test3' ,
                     value: "```TESTING```",
                     
                   },
                   {
                     name: 'test4' ,
                     value: "```TESTING```",
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