//Function called with prefix !ban, used to attempt user ban
function ban(message) 
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

//function called on prefix !kick, used to attempt to kick member
function kick(message) 
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

function help(message) 
{
    message.channel.send('Available Commands!\n' +
                  // 'kick [required: user]: will attempt to kick the specified user\n' +
                  //'ban [required: user]: will attempt to ban the specified user\n' +
                  //'kill : will shut down the bot\n' +
                  //'softkill : will make the bot unresponsive to commands until the softkill command is used again\n' +
                  'help : Displays this help command with a list of bot commands!\n' +
                  'ping : Displays the bots ping!\n' +
                  'motivateme : Sends a motivational quote or meme\n' +
                  'quote : Generate a random cs-quote(MOST OF THESE ARE FUNNY ASF)\n' +
                  'makemelaugh : Generates a random asf quote\n' +
                  'ce : Sends a message with every unique server emoji responded to it');
}

function clean(message, num, client)
{
  if(message.member.roles.cache.find(r => r.name === "clean")) 
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


module.exports = {kick, ban, help, clean};