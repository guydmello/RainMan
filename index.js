// required imports and dotenv to hide api keys
import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
import { createRequire } from 'module';

// required variables that cannot be modified or changed as they require imports and predefined start values.
const require = createRequire(import.meta.url);
const axios = require('axios')
const fetch = require('node-fetch')
const prefix = '!'
const { MessageEmbed } = require('discord.js');
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES, 
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

// default cities for weather and main cities if cities are modified.
var Default_Cities = ['Toronto', 'Mississauga', 'Brampton', 'Vaughan']
var Main_Cities = ['Toronto', 'Mississauga', 'Brampton', 'Vaughan']

client.on('ready', () => {
    console.log('The bot is ready')
    console.log("----------------")
})

// function to capitalize first letter of word
function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

// upon the bot being added into a server, sends a custom help message indicating commands.
client.on('guildCreate', guild => {
    guild.systemChannel.send(`Hello, I'm RainMan. Thanks for inviting me, here are a list of all my commands! :cloud:`)
    const commandEmbed = {
        color: 0x0099ff,
        title: `Commands for RainMan`,
        author: {
            name: 'RainMan',
            icon_url: 'https://media.discordapp.net/attachments/932442757514031116/932444008259665920/cloud.jpg',
            url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
        },
        fields: [
            {
                name: "```!help```",
                value: "This gives you all commands",
            },
            {
                name: "```!weather```",
                value: `This gives you 4 defualt location temprature and weather descriptions for ${capitalizeFirstLetter(Default_Cities[0])}, ${capitalizeFirstLetter(Default_Cities[1])}, ${capitalizeFirstLetter(Default_Cities[2])}, ${capitalizeFirstLetter(Default_Cities[3])}`,
            },
            {
                name: "```!weather [City] [Country Code(Optional)]```",
                value: "This gives you weather information as well as location on a map for the given City and the optional 2 letter Country Code",
            },
            {
                name: "```!clear [number]```",
                value: "clears the given number of messages",
            },
            {
                name: "```!change [1-4] [City 1] [City 2 (Optional)] [City 3 (Optional)] [City 4 (Optional)]```",
                value: "Changes the default city list. Changes the city numbers given from 1-4 to the new city inputs of City 1, City 2, City 3 or City 4",
            },
            {
                name: "```!reset```",
                value: `Resets the default city list: ${capitalizeFirstLetter(Default_Cities[0])}, ${capitalizeFirstLetter(Default_Cities[1])}, ${capitalizeFirstLetter(Default_Cities[2])}, ${capitalizeFirstLetter(Default_Cities[3])} ==> ${Main_Cities[0]}, ${Main_Cities[1]}, ${Main_Cities[2]}, ${Main_Cities[3]}.`,
            },
        ],
        timestamp: new Date(),
        footer: {
            text: 'RainMan provided by Guy, Kavan, Piyush',
            icon_url: 'https://media.discordapp.net/attachments/932442757514031116/932444008259665920/cloud.jpg',
        },
    };
    guild.systemChannel.send({ embeds: [commandEmbed] })
  });

// upon the bot being in a server, it can take multiple commands related to weather below
client.on("messageCreate", async msg => {
    if(!msg.content.startsWith(prefix)) {
        return
    }

    // parse the input string from the user
    msg.content.toLowerCase()
    console.log(msg.content)
    console.log("-----------")
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift()?.toLowerCase()

    // if the command is clear, then it will clear messges in the specified channel
    if(command === 'clear') {
        let num = 1
        if (args[0]) {
            num = parseInt(args[0]) + 1
            if (msg.channel.type === "GUILD_TEXT") {
                msg.channel.bulkDelete(num)
                msg.channel.send(`bot deleted ${args[0]} messages for you`)
            }
        }
        else {
            msg.channel.bulkDelete(num)
            msg.channel.send(`bot deleted 1 messages for you`)
        }
    }

    // function to convert time from utc to eastern standard time
    function time_convert(t){
        var date = new Date(t * 1000)
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    // if command is help, then print a embed that displays commands
    if (command === "help"){
        const commandEmbed = {
            color: 0x0099ff,
            title: `Commands for RainMan`,
            author: {
                name: 'RainMan',
                icon_url: 'https://media.discordapp.net/attachments/932442757514031116/932444008259665920/cloud.jpg',
                url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            },
            fields: [
                {
                    name: "```!weather```",
                    value: `This gives you 4 defualt location temprature and weather descriptions for ${capitalizeFirstLetter(Default_Cities[0])}, ${capitalizeFirstLetter(Default_Cities[1])}, ${capitalizeFirstLetter(Default_Cities[2])}, ${capitalizeFirstLetter(Default_Cities[3])}`,
                },
                {
                    name: "```!weather [City] [Country Code(Optional)]```",
                    value: "This gives you weather information as well as location on a map for the given City and the optional 2 letter Country Code",
                },
                {
                    name: "```!clear [number]```",
                    value: "clears the given number of messages",
                },
                {
                    name: "```!change [1-4] [City 1] [City 2 (Optional)] [City 3 (Optional)] [City 4 (Optional)]```",
                    value: "Changes the default city list. Changes the city numbers given from 1-4 to the new city inputs of City 1, City 2, City 3 or City 4",
                },
                {
                    name: "```!reset```",
                    value: `Resets the default city list: ${capitalizeFirstLetter(Default_Cities[0])}, ${capitalizeFirstLetter(Default_Cities[1])}, ${capitalizeFirstLetter(Default_Cities[2])}, ${capitalizeFirstLetter(Default_Cities[3])} ==> ${Main_Cities[0]}, ${Main_Cities[1]}, ${Main_Cities[2]}, ${Main_Cities[3]}.`,
                },

            ],
            timestamp: new Date(),
            footer: {
                text: 'RainMan provided by Guy, Kavan, Piyush',
                icon_url: 'https://media.discordapp.net/attachments/932442757514031116/932444008259665920/cloud.jpg',
            },
        };
        msg.channel.send({ embeds: [commandEmbed] })
    }

    // if reset, reset the 4 cities to their defualt
    if (command  === 'reset') {
        Default_Cities = Main_Cities;
    }
    // if command change, change the 4 cities to the user specified in the 4 options
    if (command  === 'change' && args[0] && args[1]) {
        if (!(isNaN(args[0]))) {
            var len = args[0].length;
            var Index = [];
            for (let i = 0; i <= len; i++) {
                var x = parseInt(args[0].charAt(i)) - 1;
                if ((x <= 3) && (x >= 0)){
                    Index.push(x)
                }
            }
            var New_Cities = [];
            for (let i = 1; i < len + 1; i++) {
               if (args[i]) {
                   New_Cities.push(args[i])
               }
            }
            var j = 0;
            while (j < New_Cities.length && j < Index.length) {
                let getWeather = async () => {
                    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${New_Cities[j]},,${args[1]}&units=metric&appid=${process.env.WEATHER_KEY}`)
                    let json = await result.json()
                    return json
                }
                let weather = await getWeather()
                if (!(weather.cod === "404")){
                    Default_Cities[Index[j]] = New_Cities[j];
                    j++;
                } else {
                    msg.channel.send(`Invaid City Input of ${New_Cities[j]}`)
                }
            } 
        }
    }

    // if weather, print a bunch of data based on user input
    if (command === 'weather' && args[0]) {
        let getWeather = async () => {
            let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]},,${args[1]}&units=metric&appid=${process.env.WEATHER_KEY}`)
            let json = await result.json()
            return json
        }
        let weather = await getWeather()
        if (weather.cod === "404"){
            msg.channel.send("City not found!")
            return
        } else {
            var gust
            if (!weather.wind.gust){
                gust = 0
            }else{
                gust = weather.wind.gust
            }
        const weatherEmbed = {
            color: 0x0099ff,
            title: `Weather for ${weather.name}, ${weather.sys.country}`,
            author: {
                name: 'RainMan',
                icon_url: 'https://media.discordapp.net/attachments/932442757514031116/932444008259665920/cloud.jpg',
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
                    value: `${gust}m/s`,
                    inline: true,
                },
                {
                    name: 'Degree:',
                    value: `${weather.wind.deg}°`,
                    inline: true,
                },
                {
                    name: ':hot_face: Humidity:',
                    value: `${weather.main.humidity}%`,
                    inline: true,
                },
                {
                    name: ':sunrise: Sunrise:',
                    value: `${time_convert(weather.sys.sunrise)}`,
                    inline: true,
                },
                {
                    name: ':city_sunset: Sunset:',
                    value: `${time_convert(weather.sys.sunset)}`,
                    inline: true,
                },
                {
                    name: 'Map:',
                    value: `[Wanna go?](https://maps.google.com/?ll=${weather.coord.lat},${weather.coord.lon})`, 
                },
            ],
            heading: `Map for ${weather.name}, ${weather.sys.country}`,
            image: {
                url: `https://image.maps.ls.hereapi.com/mia/1.6/mapview?co=${weather.sys.country}&z=24&i=1&ci=${weather.name}&&&w=400&apiKey=${process.env.MAP_KEY}`,
            },
            timestamp: new Date(),
            footer: {
                text: 'RainMan provided by Guy, Kavan, Piyush',
                icon_url: 'https://media.discordapp.net/attachments/932442757514031116/932444008259665920/cloud.jpg',
            },
        };
        msg.channel.send({ embeds: [weatherEmbed] })
    }
    // if defualt weather, log the emebed of the defualt cities unless user CHANGE_ID
    } else if (command === 'weather' && !args[0]) {
        const City_Data = []
        for (let i = 0; i < Default_Cities.length; i++) {
            let getWeather = async () => {
                let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Default_Cities[i]}&units=metric&appid=${process.env.WEATHER_KEY}`)
                let json = await result.json()
                return json
            }
            let weather = await getWeather()
            console.log(weather)
            City_Data.push([weather.name, weather.main.temp, weather.main.feels_like, weather.weather[0].description])
        }
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'Weather',
            url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            author: {
                name: 'RainMan',
                icon_url: 'https://media.discordapp.net/attachments/932442757514031116/932444008259665920/cloud.jpg',
                url: 'https://discord.com/api/oauth2/authorize?client_id=932030243768795178&permissions=534723947584&scope=bot',
            },
            fields: [
                {
                    name: 'Location:',
                    value: `\n:pushpin: ${City_Data[0][0]}\n\n:pushpin: ${City_Data[1][0]}\n\n:pushpin: ${City_Data[2][0]}\n\n:pushpin: ${City_Data[3][0]}`,
                    inline: true,
                },
                {
                    name: 'Temperature:',
                    value: `\n:thermometer: ${Math.floor(City_Data[0][1])}\n\n:thermometer: ${Math.floor(City_Data[1][1])}\n\n:thermometer: ${Math.floor(City_Data[2][1])}\n\n:thermometer: ${Math.floor(City_Data[3][1])}`,
                    inline: true,
                },
                {
                    name: 'Description:',
                    value: `\n:telescope: ${City_Data[0][3]}\n\n:telescope: ${City_Data[1][3]}\n\n:telescope: ${City_Data[2][3]}\n\n:telescope: ${City_Data[3][3]}`,
                    inline: true,
                },
                
            ],
            timestamp: new Date(),
            footer: {
                text: 'RainMan provided by Guy, Kavan, Piyush',
                icon_url: 'https://media.discordapp.net/attachments/932442757514031116/932444008259665920/cloud.jpg',
            },
        };
        msg.channel.send({ embeds: [exampleEmbed] });

    }
})
// ensure client is logged in witht the api token
client.login(process.env.TOKEN)