const Discord = require("discord.js"); // imports the discord library
const Administrative = require("./user_code/Administrative");
const Entertainment = require("./user_code/Entertainment");
const Server = require("./user_code/Server");
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


client.on('ready', () => 
    {
        // Set bot status to: "Playing with JavaScript"
        client.user.setActivity("with JavaScript and learning new features!");

        client.users.cache.get("707293854507991172")
    });

///////Everything above is basic bot config information.  Do not touch unless you know what you are doing!/////


let softkill = false; 


client.on("message", message => 
{ // runs whenever a message is sent

  let spambool = spamProtect(message.content);
  if ((spambool===false) && (!message.content.startsWith('Gave +1')))
  {
    message.delete({ timeout: 2000 })
    console.log("Deleting message: "+message.content);
  }

  if (!softkill) {
    if (message.content === `${prefix}random`) 
    {
        const number = Math.random(); // generates a random number
        message.channel.send(number.toString()); // sends a message to the channel with the number
    } 
    //Responds with Pong after send the ping command with prefix
    else if (message.content === `${prefix}ping`) 
    {  
        message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

    } 
    //Kills and stops server with response when a specific user (In this case Brendan#9412) runs the kill command with prefix
    else if (message.content === `${prefix}kill`)  
    {
      Server.kill(message);
    }
    //Displays the user info of the person who sends
    else if (message.content === `${prefix}user-info`)
    {
      message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
    //Send Custom emojis message when doing {prefix}ce comamnd
    else if (message.content === `${prefix}ce`)
    {
      Entertainment.ce(message);  
    }
    //Sends a motivational quote (or meme)
    else if (message.content === `${prefix}motivateme`)
    {
      Entertainment.motivateme(message);
    }
    //Attempts to kick user
    else if (message.content.startsWith(`${prefix}kick`)) {
      if (!message.guild) return;

      Administrative.kick(message);
    }
    //Attempts to ban user
    else if (message.content.startsWith(`${prefix}ban`)) {
      if (!message.guild) return;

      Administrative.ban(message);
    }
    //Prints help message
    else if (message.content.startsWith(`${prefix}help`)) {
      Administrative.help(message);
    }

  } else if (message.content === `${prefix}softkill`) { //softkill functionality
    softkill = Server.soft_kill(message);
  }
}); //End of Message Sent loop


function spamProtect(input) {

    if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(input)) {
      return true;
    }

    if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(input)) {
      return true;
    }

    var symTolerance = .1; //How lenient the protection is for symbols
    var symbolCount = 0;
    //String(input).length - String(input).match(regex).length;

    for (i = 0; i < input.length; i++) {
        if (!/[\w-=\(\)\<\>\{\}\[\]\s\+]/.test(input[i])) {
            symbolCount += 1;
        }
    }

    if (symbolCount > symTolerance * input.length && symbolCount > 3) {
        return false;
    }

    var capTolerance = .1; //How lenient the protection is for caps
    var capCount = 0;
    for (var i = 0 ; i < input.length; i++) {
        if (/[A-Z]/.test(input[i])) {
            capCount++;
        }
    }

    if (capCount > capTolerance * input.length && capCount > 8) {
        return false;
    }

    return true;
}

client.login(token); // starts the bot up