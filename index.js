const Discord = require("discord.js"); // imports the discord library
const fs = require("fs"); // imports the file io library  IGNORE ERRORS ON THIS LINE!  DO NOT REMOVE!
const { prefix, token } = require('./config.json');
const client = new Discord.Client(); // creates a discord client
//const token = fs.readFileSync("token.txt").toString(); // gets your token from the file

client.once("ready", () => 
{
    // prints "Ready!" to the console once the bot is online
    console.info(`Logged in as ${client.user.tag}!`);
    console.info("Ready and stable!");
    //Displays Ready and stable in console on run to verify the bot actually starts and doesnt crash

client.channels.cache.get('806391647294324766').send('CompSci Bot Online and Ready!'); 
    //Shoots a Ready command into the corresponding channel
});

let softkill = false; 
client.on("message", message => 
{ // runs whenever a message is sent
    if ((message.content === `${prefix}random`) && (softkill === false)) 
    {
        const number = Math.random(); // generates a random number
        message.channel.send(number.toString()); // sends a message to the channel with the number
    }

    //Responds with Pong after send the ping command with prefix
    if ((message.content === `${prefix}ping`) && (softkill === false)) 
    {  
        message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }

    //Kills and stops server with response when a specific user (In this case Brendan#9412) runs the kill command with prefix
    if ((message.content === `${prefix}kill`) && (softkill === false))  
    {
        if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) return;
            message.channel.send('Stopping the bot as per exclusive admin command!').then(() => 
            {
                process.exit(1);
            })
    }
    
    //ADDS SOFT KILL TO BOT COMMANDS
    if (message.content === `${prefix}softkill`)  
    {
        if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) return;
            message.channel.send('SoftKill '+!softkill).then(() => 
            {
                softkill = !softkill;
            })
    }

    if ((message.content === `${prefix}user-info`) && (softkill === false))
    {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }

}); //End of Message Sent loop

// client.on('guildMemberAdd', (guildMember) => 
//     {
//         guildMember.roles.add(`CompSciAutoRole`);
//     });


client.on('ready', () => 
    {
        // Set bot status to: "Playing with JavaScript"
        client.user.setActivity("with JavaScript and learning new features!")
    });


client.login(token); // starts the bot up