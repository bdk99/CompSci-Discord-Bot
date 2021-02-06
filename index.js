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
  if ((spambool===false)&& (!message.content.startsWith('Gave +1')))
  {
    message.delete({ timeout: 2000 })
    console.log("Deleting message: "+message.content);
  }

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

    //Send Custom emojis message when doing {prefix}ce comamnd
   if ((message.content === `${prefix}ce`) && (softkill === false))
   {
       const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'billtiger');
        const reactionEmoji2 = message.guild.emojis.cache.find(emoji => emoji.name === 'hackerevett');
        const reactionEmoji3 = message.guild.emojis.cache.find(emoji => emoji.name === '420');
        const reactionEmoji4 = message.guild.emojis.cache.find(emoji => emoji.name === '69');
        const reactionEmoji5 = message.guild.emojis.cache.find(emoji => emoji.name === 'potatojump');
        const reactionEmoji6 = message.guild.emojis.cache.find(emoji => emoji.name === 'billiam');
        const reactionEmoji7 = message.guild.emojis.cache.find(emoji => emoji.name === 'youngmanny');
        const reactionEmoji8 = message.guild.emojis.cache.find(emoji => emoji.name === 'CourtManny');
        const reactionEmoji9 = message.guild.emojis.cache.find(emoji => emoji.name === 'sillybilly');
        const reactionEmoji10 = message.guild.emojis.cache.find(emoji => emoji.name === 'santamanny');
        const reactionEmoji11 = message.guild.emojis.cache.find(emoji => emoji.name === 'billywow');
        const reactionEmoji12 = message.guild.emojis.cache.find(emoji => emoji.name === 'zhangy');
        const reactionEmoji13 = message.guild.emojis.cache.find(emoji => emoji.name === 'billy2');
        const reactionEmoji14 = message.guild.emojis.cache.find(emoji => emoji.name === 'manny');
        const reactionEmoji15 = message.guild.emojis.cache.find(emoji => emoji.name === 'billmoji');
        const reactionEmoji16 = message.guild.emojis.cache.find(emoji => emoji.name === 'tim');

        message.reply(`${reactionEmoji}`);
        message.react(reactionEmoji2);
        message.react(reactionEmoji3);
        message.react(reactionEmoji4);
        message.react(reactionEmoji5);
        message.react(reactionEmoji6);
        message.react(reactionEmoji7);
        message.react(reactionEmoji8);
        message.react(reactionEmoji9);
        message.react(reactionEmoji10);
        message.react(reactionEmoji11);
        message.react(reactionEmoji12);
        message.react(reactionEmoji13);
        message.react(reactionEmoji14);
        message.react(reactionEmoji15);
        message.react(reactionEmoji16);
   }

   if ((message.content === `${prefix}motivateme`) && (softkill === false))
    {
      var quotes = [
        "https://tenor.com/view/do-it-star-wars-gif-4928619",
        "Push yourself, because no one else is going to do it for you.",
        "If you see a chance to be kind to someone tomorrow, take it. I think we need it. -Brad Pitt",
        "If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much.",
        "Life is 10% what happens to you and 90% how you react to it.",
        "Problems are not stop signs, they are guidelines.",
        "Problems are not stop signs, they are guidelines. -Elon Musk",
        "If you fell down yesterday, stand up today. -H.G. Wells",
        "If you fell down yesterday, stand up today.",
      ]
      var index = getRandomInt(quotes.length - 1);
      message.channel.send(quotes[index]);
    }
}); //End of Message Sent loop


//SERVER KICK MEMBER CODE
client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // If the message content starts with "!kick"
    if (message.content.startsWith(`${prefix}kick`) && (softkill === false)) 
    {
        if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) 
        {
            message.reply('I was unable to kick the member!  Permission denied!');
            return;
        }
        
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              // We let the message author know we were able to kick the person
              message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply('I was unable to kick the member');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("That user isn't in this guild!");
        }
        // Otherwise, if no user was mentioned
      } else {
        message.reply("You didn't mention the user to kick!");
      }
    }
  });



  //SERVER BAN MEMBER CODE
  client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // if the message content starts with "!ban"
    if (message.content.startsWith(`${prefix}ban`) && (softkill === false)) 
    {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions

      if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) 
      {
          message.reply('I was unable to ban the member!  Permission denied!');
          return;
      }

      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
           */
          member
            .ban({
              reason: 'They were bad!',
            })
            .then(() => {
              // We let the message author know we were able to ban the person
              message.reply(`Successfully banned ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to ban the member,
              // either due to missing permissions or role hierarchy
              message.reply('I was unable to ban the member');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("That user isn't in this guild!");
        }
      } else {
        // Otherwise, if no user was mentioned
        message.reply("You didn't mention the user to ban!");
      }
    }
  });




  function spamProtect(input) {

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

client.login(token); // starts the bot up