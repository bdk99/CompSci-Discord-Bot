
const Discord = require("discord.js"); // imports the discord library
const fs = require("fs"); // imports the file io library
const { prefix, token } = require('./config.json');
const client = new Discord.Client(); // creates a discord client
//const token = fs.readFileSync("token.txt").toString(); // gets your token from the file

client.once("ready", () => { // prints "Ready!" to the console once the bot is online
    console.info(`Logged in as ${client.user.tag}!`);
    console.info("Ready and stable!");
    client.channels.cache.get('806391647294324766').send('CompSci Bot Online and Ready!') //Shoots a Ready command into the corresponding channel
});

client.on("message", message => 
{ // runs whenever a message is sent
    if (message.content === `${prefix}random`) 
    {
        const number = Math.random(); // generates a random number
        message.channel.send(number.toString()); // sends a message to the channel with the number
    }

    //Responds with Pong after send the ping command with prefix
    if (message.content === `${prefix}ping`) 
    {
        message.channel.send('Pong.');
    }

    //Kills and stops server with response when a specific user (In this case Brendan#9412) runs the kill command with prefix
    if (message.content === `${prefix}kill`)  
    {
        if (message.author.id !== '404717378715385856') return;
            message.channel.send('Stopping the bot as per owners command!').then(() => 
            {
                process.exit(1);
            })
      };
});

client.login(token); // starts the bot up