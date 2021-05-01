//Administrative.js
const { brendanid, modrole }= require('../ids.json');
const { devstate } = require('../config.json');

//Function called with prefix !ban, used to attempt user ban
async function ban(message) 
{
    // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
  
        if(message.author.id !== `${brendanid}`)
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

//function called on prefix !kick, used to kick a specific member
async function kick(message) 
{
      if (message.author.id !== `${brendanid}`) 
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

//Lists bot commands as a help message
async function help(message) 
{
    message.channel.send('Available Commands!\n' +
                  '!help : Displays this help command with a list of bot commands!\n' +
                  '!ratep : name description : Rate a professor!\n' +
                  '!viewratings name : Get the rating of a teacher!\n' +
                  '!focusmode duration time(hour(s)/minutes(s)/seconds(s)) : Locks you out of every channel for a certain amount of time!\n' +
                  '!ping : Displays the bots ping!\n' +
                  '!motivateme : Sends a motivational quote or meme\n' +
                  '!quote : Generate a random cs-quote(MOST OF THESE ARE FUNNY ASF)\n' +
                  `$open : Open a ticket to get help from a mod\n` +
                  `$close : Close a ticket\n` +
                  `!quote <Can add name of professor or person, don't need to though> : Generate a random cs-quote(MOST OF THESE ARE FUNNY ASF)\n` +
                  '!makemelaugh : Generates a random asf quote\n');
}

//Mention alerts for owner and known underage people on the server
function mentionalerts(client, message)
{
  if(message.content.includes('Brendan') || message.content.includes('Klein')|| message.content.includes('brendan')|| message.content.includes('klein'))
  {
    client.channels.cache.get('818584141846151219').send(`${message.author.username} mentioned you in a message! --> ${message.content}`); 
  }
  if(message.content.includes('Elizabeth') || message.content.includes('elizabeth')|| message.content.includes('Varton')|| message.content.includes('varton') || (message.author.id === '776256478877057035'))
  {
    client.channels.cache.get('828425906259230750').send(`Elizabeth Flag --> "${message.content}" in <#${message.channel.id}>`); 
  }
  if(message.content.includes('Noah') || message.content.includes('noah')|| message.content.includes('Subhail')|| message.content.includes('subhail') || (message.author.id === '443877848168792074'))
  {
    client.channels.cache.get('828425906259230750').send(`Noah Flag --> "${message.content}" in <#${message.channel.id}>`); 
  }
}

//Code for wiping a specified number of messages from a channel (MOD ONLY)
async function clean(message, num, client)
{
  if(message.member.roles.cache.find(r => r.name === `${modrole}`)) 
  { 
    if(num>100 || num<2)
    {
      message.channel.send("Unable to delete!  Args must be between 2 and 100!");
      return;
    }
    message.channel.bulkDelete(`${num}`).then(() => {
      message.channel.send(`MASS DELETED ${num} MESSAGES!`).then(msg => {
        msg.delete({timeout: 3000});
      })
    });

    client.channels.cache.get("784093143389700137").send(`${message.author.username} deleted ${num} messages in ${message.channel}`);
    return;
  }
  else 
  {
    message.channel.send(`Access Denied!`).then(msg => {
      msg.delete({timeout: 3000});
    });
    message.delete({ timeout: 2000 });
    return;
  }
}

//Function to alert on specific users presenceUpdates
async function presenceUpdate(oldPresence, newPresence)
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
}


module.exports = { kick, ban, help, clean, mentionalerts, presenceUpdate }