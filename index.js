const Discord = require("discord.js"); // imports the discord library
const fs = require("fs"); // Imports the file io library  IGNORE ERRORS ON THIS LINE!  DO NOT REMOVE!
const { prefix, token } = require('./config.json');
const { brendanid, andreakaid, ryanid}= require('./userids.json');
const client = new Discord.Client(); // creates a discord client

const Administrative = require("./user_code/Administrative");
const Entertainment = require("./user_code/Entertainment");
const Server = require("./user_code/Server");

client.once("ready", () => 
{
    console.info(`Logged in as ${client.user.tag}!`);
    console.info("Ready and stable!");
    //Displays Ready and stable in console on run to verify the bot actually starts and doesnt crash

  client.channels.cache.get('806391647294324766').send('CompSci Bot Online and Ready!'); //Shoots message into #bot-status channel on CompSci server
  client.channels.cache.get('807719819084431371').send('CompSci Bot Online and Ready!'); //Shoots message into #bot-status channel on Bot test server
    //Shoots a Ready command into the corresponding channel
});

client.on('ready', () => 
    {
        // Set bot status to: "Playing with JavaScript"
        client.user.setActivity("with JavaScript and learning new features!");
        //client.users.cache.get("707293854507991172") Any idea where this line of code came from?  Or what the ID is for?
    });
///////Everything above is basic bot config information.  Do not touch unless you know what you are doing!/////

var softkill = false; 
var bypass = false;
var bypassdelete=false;

client.on("message", message => 
{ // runs whenever a message is sent

  //Ignores bots from deleting their own messages with spam filter, and deleting other bots messages
  if (message.author.bot) return;

  if (message.content.startsWith(`${prefix}tb`))
  { 
    if((message.author.id !=`${brendanid}`)&&(message.author.id !=`${ryanid}`)&&(message.author.id !=`${andreakaid}`))
    {  //Only allows the users with the ids specified allowed access to bypass the Caps filter
      message.delete({ timeout: 2000 });
      return;
    }
      var args = message.content.slice(3).trim();
      message.channel.send(`${args} by: ${message.author.username}`);
      bypassdelete=true;
  }
 
  if (!bypass)
    {
      let spambool = spamProtect(message.content);                                                        //MC-CHAT CHANNEL ID                           //MC-CONSOLE CHANNEL ID
      if ((spambool===false) && (!message.content.startsWith('Gave +1 Rep to')) && (message.channel.id != '801657065676079144')&& (message.channel.id != '801657164266471424'))
      {
        message.delete({ timeout: 2000 })
        console.log("Deleting message: "+message.content);
      }
      else if(bypassdelete===true)
      {
        bypassdelete=false;
      } 
    } 

  if (!softkill) 
  {
    //Adds the bypass command to toggle bypassing the Caps Filter
    if (message.content === `${prefix}bypass`) 
    {
      bypass = Server.bypass(message,bypass);
    } 

    //Responds with a random quote from the list compiled on 2.7.2021 from cs-quotes channel
    if (message.content === `${prefix}quote`) 
    {
      Entertainment.quote(message);
    } 

    //Responds from a random quote at Saras personal collection of quotes
    if (message.content === `${prefix}makemelaugh`) 
    {
      Entertainment.makemelaugh(message);
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
    else if (message.content.startsWith(`${prefix}kick`)) 
    {
      if (!message.guild) return;

      Administrative.kick(message);
    }

    //Attempts to ban user
    else if (message.content.startsWith(`${prefix}ban`)) 
    {
      if (!message.guild) return;

      Administrative.ban(message);
    }

    //Prints help message
    else if (message.content.startsWith(`${prefix}help`)) 
    {
      Administrative.help(message);
    }
  }
  if(message.content === `${prefix}softkill`) 
  { //softkill functionality
    softkill = Server.soft_kill(message,softkill);
  }
}); //End of Message Sent loop



//Function to protect our chats from caps :D.  Full credit to Ryan Kim on this one!  Bypassed with tb or bypass commands
function spamProtect(input) 
{
    var capTolerance = .25; //How lenient the protection is for caps
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