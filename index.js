const Discord = require('discord.js')// imports the discord library
const client = new Discord.Client();

//Imports the necessary user code files to the index in order for later use
const { prefix, token, devstate } = require('./config.json');
const { csquoteschannel, brendanid, moddiscussion }= require('./ids.json');

const command = require('./command')
const Administrative = require("./user_code/Administrative");
const Entertainment = require("./user_code/Entertainment");
const Server = require("./user_code/Server");
const Quotescode = require("./user_code/Quotescode");
const ReviewsCode = require("./user_code/Reviewscode");
const Channelcreator = require("./user_code/Channelcreator");
const Clientmessagedeletion = require("./user_code/Clientmessagedeletion");

var softkill = false;
var bypass = false;

client.once('ready', () => 
{
  if(`${devstate}`=='true')
  {
    console.info(`Logged in as ${client.user.tag}!`);
    //Displays Ready and stable in console on run to verify the bot actually starts and doesnt crash
    console.info("Starting in Development Mode");
    //Shoots a Ready command into console
    console.info("Ready and stable!");
    //client.channels.cache.get('816882589116923914').send('Dev Mode READY!'); 

    client.user.setActivity("with JavaScript and learning new features!"); //Sets the discord status activity of the bot
  }
  else
  {
    console.info(`Logged in as ${client.user.tag}!`);
    console.info("Ready and stable!");
    client.channels.cache.get('806391647294324766').send('CompSci Bot Online and Ready!'); 
    //Shoots a ready command in #bot-status

    client.user.setActivity("with JavaScript and learning new features!");  //Sets the discord status activity of the bot
  }

  //Needs fixed ASAP
  //Needs fixed ASAP
  //Needs fixed ASAP
  //Needs fixed ASAP
  //client.setMaxListeners(30)  //Sets the max listeners to 30 to prevent a memory leak crash!  NEEDS FIXED ASAP
  //Needs fixed ASAP
  //Needs fixed ASAP
  //Needs fixed ASAP
  //Needs fixed ASAP

  command(client, 'ping', message => {
    message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  })

  command(client, 'kill', message => {
    Server.kill(message);
  })

  command(client, 'ratep', message => {
    ReviewsCode.RateProfessor(message, client);
  })

  command(client, 'focusmode', message => {
    Entertainment.focus(message);
  })

  command(client, 'viewratings', message => {
    ReviewsCode.viewRatings(message);
  })

  command(client, 'clean', message => {
    var num = message.content.slice(6).trim();
    Administrative.clean(message, num, client);
  })

  command(client, 'help', message => {
    Administrative.help(message);
  })

  command(client, 'ffm', message => {
    Entertainment.forcedfocusmode(message, client);
  })

  //Adds the bypass command to toggle bypassing the Caps Filter
  command(client, 'bypass', message => {
    bypass = Server.bypass(message,bypass);
  })

  //Responds with a random quote from the quotes file
  command(client, 'quote', message => {
    if(message.content.startsWith(`${prefix}quote count`))
      Quotescode.quotecounter(message);
    else
      Quotescode.quote(message);
  })

  //Responds from a random quote at Saras personal collection of quotes
  command(client, 'makemelaugh', message => {
    Entertainment.makemelaugh(message);
  })

  //Displays the user info of the person who sends
  command(client, 'user-info', message => {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  })

  //Send Custom emojis message when doing {prefix}ce comamnd
  command(client, 'ce', message => {
    Entertainment.ce(message);  
  })

  //Sends a motivational quote (or meme)
  command(client, 'motivateme', message => {
    Entertainment.motivateme(message);
  })

  //Attempts to kick a user
  command(client, 'kick', message => {
    if (!message.guild) 
      return;
    Administrative.kick(message);
  })

  //Attempts to ban a user
  command(client, 'ban', message => {
    if (!message.guild) 
      return;
    Administrative.ban(message);
  })

  //Softkill functionality
  command(client, 'softkill', message => {
    softkill = Server.soft_kill(message,softkill);
  })
});



if(`${devstate}`=='false')
{
  //Completes a cronjob task to display the quote of the day in general on main server at 10 AM everyday if devstate is false
  Server.cronjobs(client)
}




client.on("message", message => 
{ // runs whenever a message is sent

  //Ignores bots from deleting their own messages with spam filter, and deleting other bots messages
  if(!message.content.startsWith(`${prefix}quote`))
  {
    if(message.author.bot) 
      return;
  }


  if ((!bypass && (message.author.id !== `${brendanid}`)))
  {
    let capsbool = Server.capsProtect(message.content);
    if ((capsbool==false) && (!message.content.startsWith('Gave +1 Rep to')))
    {
      message.delete({ timeout: 2000 })
      console.log("Deleting message: "+message.content);
    } 
  }

  if(message.content.includes('roomer') || message.content.includes('Roomer')|| message.content.includes('gocci')|| message.content.includes('Gocci')|| message.content.includes('brendy') || message.content.includes('Brendy'))
  {
    message.delete({ timeout: 1000 });
    console.log("Deleting message: "+ message.content);
  }

  //Skips executing chat logger in text channel if devmode in config.json is false, if true... logs chats in console ONLY
  if(`${devstate}`=='false')
  {
    Server.chatlogger(client, message);
    Administrative.mentionalerts(message, client);
  }
  if(`${devstate}`=='true')
    console.log(`${message.content} ----> By ${message.author.username} in #${message.channel.name}`);
  //------------------------------------Message Filtering and Flagging Ends Here-------------------------

  
  if(message.content.startsWith(`$open`))
  {
    message.channel.send(`**Support Ticket Downtime**  
    The ticket system is disabled until after exams in order to allow mods to focus on exams.  If you need help reach out to the tutoring center or go to your professors office hours!  Most mods (if not all) will not be responding to tickets or DMs messages at this time.  More information about the tutoring center can be found here:
    -->https://www.emich.edu/computer-science/student-resources/index.php
    -->https://www.emich.edu/academic-support-programs/hsc/academic-support/tutoring/students.php`);
  }


  if((message.channel.id === `${csquoteschannel}`)||(message.channel.id === `${moddiscussion}`))
  {
    Quotescode.quotecatcher(message, client);
  }

  if((message.content.startsWith(`${prefix}canned`))&&((message.author.id === `${brendanid}`)))
  {
    //message.channel.send(`All the mods are currently unavalible, if you need something urgently please email the instructor at LZhang5@emich.edu.  Have a nice day.`);
    //message.channel.send(`"This so dumb - L. Zhang"`);
    message.channel.send(`\"Enough is enough... SHUT UP\" - Zhang`)
  }

  /////////////////////////////CHANNEL CREATION BLOCK (DO NOT REMOVE!  COMMENTED OUT FOR SECURITY REASONS!)/////////////////////////////

  // if(message.content.startsWith(`${prefix}csvparse`)&&(message.author.id === `${brendanid}`))
  //   Channelcreator.csvparse(message)
  // if((message.content.startsWith(`${prefix}cc`))&&((message.author.id = `${brendanid}`)))
  //  Channelcreator.createchannel(message)
  // if((message.content.startsWith(`${prefix}catc`))&&((message.author.id = `${brendanid}`)))
  //   Channelcreator.categorycreator(message)
  // if((message.content.startsWith(`${prefix}deleteALL`))&&(message.author.id === `${brendanid}`))
  //   Channelcreator.deletechannel(message);
  // if((message.content.startsWith(`${prefix}deletecat`))&&(message.author.id === `${brendanid}`))
  //   Channelcreator.deletecategory(message);
  // if((message.content.startsWith(`${prefix}swapper`))&&(message.author.id === `${brendanid}`))
  //   Channelcreator.swapper(message);
  // if((message.content.startsWith(`${prefix}channelsort`))&&(message.author.id === `${brendanid}`))
  //   Channelcreator.channelsort(message);

  /////////////////////////////CHANNEL CREATION BLOCK (DO NOT REMOVE!  COMMENTED OUT FOR SECURITY REASONS!)/////////////////////////////

}); //End of Message Sent loop


client.on('messageDelete', async message => 
{  //Fires when a message is deleted

  Clientmessagedeletion.main(message);
});


client.on('presenceUpdate', (oldPresence, newPresence) => 
{ //Fires when users updates their user status presence

  if(`${devstate}`=='false')
  {
    let member = newPresence.member;
    // User id of the user you're tracking status.
    if(member.id === '776256478877057035')
    {
        if (oldPresence == null) 
        {
          let channel = member.guild.channels.cache.get('828425906259230750');
          channel.send(`Our glorious leader has returned and is now ${newPresence.status}!`);
        }
        else if (oldPresence.status !== newPresence.status) {
            // Your specific channel to send a message in.
            let channel = member.guild.channels.cache.get('828425906259230750');

            channel.send(`Our special member is now ${newPresence.status}!`);
        }
    }
  }
});

client.login(token)

// <<----====----- Update Notes: -----======----->>
//This version of the bot completely disabled the softkill and bypass commands
