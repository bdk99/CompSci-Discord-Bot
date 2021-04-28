const Discord = require('discord.js')// imports the discord js library
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

//var softkill = false;
var bypass = false;

client.once('ready', () => 
{
  if(`${devstate}`=='true')
  {
    console.info(`Logged in as ${client.user.tag}!`);  
    console.info("Starting in Development Mode");
    console.info("Ready and stable!");   //Displays Ready and stable in console on run to verify the bot actually starts and doesnt crash
    client.user.setActivity("with JavaScript and learning new features!"); //Sets the discord status activity of the bot to a specific string
  }
  else //Fires if dev mode is set to false
  {
    console.info(`Logged in as ${client.user.tag}!`);
    console.info("Ready and stable!");
    client.channels.cache.get('806391647294324766').send('CompSci Bot Online and Ready!'); //Shoots a ready command in #bot-status on main server

    client.user.setActivity("with JavaScript and learning new features!");  //Sets the discord status activity of the bot
  }
});

//Completes a cronjob task to display the quote of the day in general on main server at 10 AM everyday if devstate is false
if(`${devstate}`=='false')
{
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

  //Basic ping command to check the status and delay time of the bot
  command(message /*Message going into command function */, 
          'ping' /*Command headed into command function */,
          RETURN /*Return from command method, should NOT be used in most situations */=> {
    message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  })

  //Kills and stops server with response
  command(message, 'kill', RETURN => {
    Server.kill(message);
  })

  //Adds a professor rating to file after mod review
  command(message, 'ratep', RETURN => {
    ReviewsCode.RateProfessor(message, client);
  })

  //Engages Focus Mode, an anti-procrastination tool
  command(message, 'focusmode', RETURN => {
    Entertainment.focus(message);
  })

  //Lists all the ratings for a specified professor that have already been approved by a mod
  command(message, 'viewratings', RETURN => {
    ReviewsCode.viewRatings(message);
  })

  //Deletes a specified amount of messages from the channel
  command(message, 'clean', RETURN => {
    var num = message.content.slice(6).trim();
    Administrative.clean(message, num, client);
  })

  //Prints help message
  command(message, 'help', RETURN => {
    Administrative.help(message);
  })

  //FORCED FOCUS MODE--Gives a moderator the ability to bypass the 3 hour focusmode limit, both for themselves and other people
  command(message, 'ffm', RETURN => {
    Entertainment.forcedfocusmode(message, client);
  })

  //The famous quote command!
  command(message, 'quote', RETURN => {
    if(message.content.startsWith(`${prefix}quote count`))
      Quotescode.quotecounter(message);
    else
      Quotescode.quote(message);
  })

  //Responds from a random quote at Saras personal collection of quotes
  command(message, 'makemelaugh', RETURN => {
    Entertainment.makemelaugh(message);
  })

  //Displays the user info of the person who sends it
  command(message, 'user-info', RETURN => {
    message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  })

  //Send Custom emojis message when doing {prefix}ce comamnd
  command(message, 'ce', RETURN => {
    Entertainment.ce(message);  
  })

  //Sends a motivational quote (or meme)
  command(message, 'motivateme', RETURN => {
    Entertainment.motivateme(message);
  })

  //Attempts to kick a user
  command(message, 'kick', RETURN => {
    if (!message.guild) 
      return;
    Administrative.kick(message);
  })

  //Attempts to ban a user
  command(message, 'ban', RETURN => {
    if (!message.guild)
      return;
    Administrative.ban(message);
  })

  //Softkill functionality  -- Currently Broken and Disabled!
  //command(message, 'softkill', softkill, RETURN => {
  //  softkill = Server.soft_kill(message,softkill);
  //})

  //Adds the bypass command to toggle bypassing the Caps Filter
  command(message, 'bypass', RETURN => {
    bypass = Server.bypass(message, bypass);
  })
  
  if(message.content.startsWith(`quote`))
  {
    if(message.content.startsWith(`${prefix}quote count`))
      Quotescode.quotecounter(message);
    else
      Quotescode.quote(message);
  }

  //The Holy CapsProtect function call
  if (!bypass)//(!bypass && (message.author.id !== `${brendanid}`)))
  {
    let capsbool = Server.capsProtect(message.content);
    if ((capsbool==false) && (!message.content.startsWith('Gave +1 Rep to')))
    {
      message.delete({ timeout: 2000 })
      console.log("Deleting message: "+message.content);
    }
  }

  //Message Filter for words roomer, gocci, and Brendy
  if(message.content.includes('roomer') || message.content.includes('Roomer')|| message.content.includes('gocci')|| message.content.includes('Gocci')|| message.content.includes('brendy') || message.content.includes('Brendy'))
  {
    message.delete({ timeout: 1000 });
    console.log("Deleting message: "+ message.content);
  }
  
  //Automatic responsce to use when we close the ticket system during exams so mods can take a break
  if(message.content.startsWith(`$open`))
  {
    message.channel.send(`**Support Ticket Downtime**  
    The ticket system is disabled until after exams in order to allow mods to focus on exams.`);
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

  //If devmode is false, log chats in console AND logs in #message-feed channel
  if(`${devstate}`=='false')
  {
    Server.chatlogger(client, message);
    Administrative.mentionalerts(message, client);
  }
  if(`${devstate}`=='true') //If devmode is true, logs chats in console ONLY
    console.log(`${message.content} ----> By ${message.author.username} in #${message.channel.name}`);

}); //End of message sent loop


//Fires when a message is deleted
client.on('messageDelete', async message => 
{  
  Clientmessagedeletion.main(message);
});

//Fires when users updates their user status presence
client.on('presenceUpdate', (oldPresence, newPresence) => 
{
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