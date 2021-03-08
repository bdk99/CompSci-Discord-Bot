const Discord = require("discord.js"); // imports the discord library
const { prefix, token, devstate } = require('./config.json');
const { csquoteschannel, FOURSEVENTYTWOchannel, mcchat, mcconsole, brendanid }= require('./ids.json');
const client = new Discord.Client(); // creates a discord client

//Imports the necessary user code files to the index in order for later use
const Administrative = require("./user_code/Administrative");
const Entertainment = require("./user_code/Entertainment");
const Server = require("./user_code/Server");
const Quotescode = require("./user_code/Quotescode");
const ReviewsCode = require("./user_code/Reviewscode");
const Channelcreator = require("./user_code/Channelcreator");

client.once("ready", () => 
{
  if(`${devstate}`=='true')
  {
    console.info(`Logged in as ${client.user.tag}!`);
    //Displays Ready and stable in console on run to verify the bot actually starts and doesnt crash
    console.info("Starting in Development Mode");
    //Shoots a Ready command into console
    console.info("Ready and stable!");
    client.channels.cache.get('816882589116923914').send('Dev Mode READY!'); 
  }
  else
  {
    console.info(`Logged in as ${client.user.tag}!`);
    console.info("Ready and stable!");
    client.channels.cache.get('806391647294324766').send('CompSci Bot Online and Ready!'); 
    //Shoots a ready command in #bot-status
  }
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

  //Completes a cronjob task to display the quote of the day in general on main server at 10 AM everyday
  Server.cronjobs(client)

client.on("message", message => 
{ // runs whenever a message is sent

  //Ignores bots from deleting their own messages with spam filter, and deleting other bots messages
  if(!message.content.startsWith(`${prefix}quote`))
  {
    if (message.author.bot) 
      return;
  }

  //Skips executing chat logger if devmode in config.json is true, otherwise logs chats in console and streamed text channel
  if(!`${devstate}`=='true')
  {
    Server.chatlogger(message);
  }

  if (!bypass && (!message.author.id == `${brendanid}`))
    {
      let capsbool = Server.capsProtect(message.content);
      if ((capsbool===false) && (!message.content.startsWith('Gave +1 Rep to')) && (message.channel.id != `${mcchat}`)&& (message.channel.id != `${mcconsole}`)&& (message.channel.id != `${FOURSEVENTYTWOchannel}`))
      {
        message.delete({ timeout: 2000 })
        console.log("Deleting message: "+message.content);
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
    if (message.content.startsWith(`${prefix}quote`)) 
    {
      Quotescode.quote(message);
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

    //Cleans a specified amount of messages
    if (message.content.startsWith(`${prefix}clean`))
    {
      var num = message.content.slice(6).trim();
      Administrative.clean(message, num, client);
    }

    //Adds a professor rating
    if(message.content.startsWith(`${prefix}ratep`))
    {
      ReviewsCode.RateProfessor(message, client);
    }

    //Lists all the ratings for a specified professor
    if(message.content.startsWith(`${prefix}viewratings`))
    {
      ReviewsCode.viewRatings(message);
    }

    //Engages Focus Mode, an anti-procrastination tool
    if (message.content.startsWith(`${prefix}focusmode`))
    {
      Entertainment.focus(message);
    }
  }
  if(message.content === `${prefix}softkill`) 
  { //softkill functionality
    softkill = Server.soft_kill(message,softkill);
  }

  if(message.channel.id === `${csquoteschannel}`)
  {
    Quotescode.quotecatcher(message, client);
  }


  
//   if((message.content.startsWith(`${prefix}csvparse`))&&((message.author.id = `${brendanid}`)&&(message.author.id = '355928972917211147')))
//    {
//      Channelcreator.csvparse(message)
//    }
//    if((message.content.startsWith(`${prefix}cc`))&&((message.author.id = `${brendanid}`)&&(message.author.id = '355928972917211147')))
//    {
//      Channelcreator.createchannel(message)
//    }
//    if((message.content.startsWith(`${prefix}catc`))&&((message.author.id = `${brendanid}`)))
//    {
//      Channelcreator.categorycreator(message)
//    }
//  if((message.content.startsWith(`${prefix}deleteALL`))&&(message.author.id === `${brendanid}`))
//    {
//      Channelcreator.deletechannel(message);
//    }



}); //End of Message Sent loop

client.login(token); // starts the bot up