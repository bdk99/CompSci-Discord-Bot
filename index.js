const Discord = require("discord.js"); // imports the discord library
const fs = require("fs"); // imports the file io library  IGNORE ERRORS ON THIS LINE!  DO NOT REMOVE!
const { prefix, token } = require('./config.json');
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

client.on("message", message => 
{ // runs whenever a message is sent

  let spambool = spamProtect(message.content);                                                //MC-CHAT CHANNEL ID                           //MC-CONSOLE CHANNEL ID
  if ((spambool===false) && (!message.content.startsWith('Gave +1 Rep to')) && (message.channel.id != '801657065676079144')&& (message.channel.id != '801657164266471424'))
  {
    message.delete({ timeout: 2000 })
    console.log("Deleting message: "+message.content);
  }
  
  //Ignores bots from deleting their own messages with spam filter, and deleting other bots messages
  if (message.author.bot) return;
  
  if (message.content.indexOf(prefix) !== 0) return;
 
  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  if (!bypass)
    {
      let spambool = spamProtect(message.content);                                                //MC-CHAT CHANNEL ID                           //MC-CONSOLE CHANNEL ID
      if ((spambool===false) && (!message.content.startsWith('Gave +1 Rep to')) && (message.channel.id != '801657065676079144')&& (message.channel.id != '801657164266471424'))
      {
        message.delete({ timeout: 2000 })
        console.log("Deleting message: "+message.content);
      }    
    } 

  if (!softkill) 
  {
    if (message.content === `${prefix}bypass`) 
    {
      bypass = Server.bypass(message,bypass);
    } 

    if (message.content === `${prefix}random`) 
    {
      const number = Math.random(); // generates a random number
      message.channel.send(number.toString()); // sends a message to the channel with the number
    } 

    if (message.content.startsWith(`${prefix}tb`)) 
    {
      message.channel.send(args);
      bypass=true;
    }

    //Responds with a random quote from the list compiled on 2.7.2021 from cs-quotes channel
    if (message.content === `${prefix}quote`) 
    {
      Entertainment.quote(message);
    } 

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
  if (message.content === `${prefix}softkill`) 
  { //softkill functionality
    softkill = Server.soft_kill(message,softkill);
  }
}); //End of Message Sent loop



//Function to protect our chats :D.  Full credit to Ryan Kim on this one!
function spamProtect(input) 
{
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