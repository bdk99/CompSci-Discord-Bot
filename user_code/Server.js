//Function that shuts down bot on kill command by specific user!
const { brendanid, modrole, approveQuotesChannel, generalchat, chatloggerchannel }= require('../ids.json');
const { prefix } = require('../config.json')
const { }

const fs = require('fs');

function CapsChecker(message)
{
    let capsbool = Server.capsProtect(message.content);
    if ((capsbool===false) && (!message.content.startsWith('Gave +1 Rep to')) && (message.channel.id != `${mcchat}`)&& (message.channel.id != `${mcconsole}`)&& (message.channel.id != `${FOURSEVENTYTWOchannel}`))
    {
      message.delete({ timeout: 2000 })
      console.log("Deleting message: "+message.content);
    }
    else if(bypassdelete===true)
    {
      bypassdelete=false;
    } 
}

function chatlogger(message)
{
    if((message.channel.id != `${chatloggerchannel}`) && (! message.content.startsWith(`${prefix}`)))
    {   //Adds a text logger.... so all messages from all channels will spit out in this channel
      console.log(`${message.author.username} sent ${message.content} in ${message.channel.name}`);
      client.channels.cache.get(`${chatloggerchannel}`).send(`${message.author.username} sent ${message.content} in ${message.channel.name}`); 
    }
}

function tempbypasscommand(message)
{
    if(message.member.roles.cache.find(r => r.name === `${modrole}`))
    {
      var args = message.content.slice(3).trim();
      message.channel.send(`${args} by: ${message.author.username}`);
    }
    else 
    {
      message.delete({ timeout: 2000 });
      console.log("Deleting message: "+message.content);
      return;
    }
}


function cronjob(client, cron)
{
    var date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    let cronjob = new cron.CronJob('00 00 14 * * *', () => {
        //CRON JOBS ARE IN UTC TIME!  EST TIME + 5 HOURS
        //DO NOT CHANGE ANYTHING IN THIS FUNCTION UNLESS YOU KNOW WHAT YOU ARE DOING! 
        client.channels.cache.get(`${generalchat}`).send(`${prefix}quote`); 
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      });
      cronjob.start()
}

async function kill(message) 
{
    if (message.author.id !== `${brendanid}`) return;
        message.channel.send('Stopping the bot as per exclusive admin command!').then(() => 
        {
            process.exit(1);
        })
}

//Function that makes bot unresponsive to commands until repeat of softkill command!
async function soft_kill(message, softkill) 
{
    if(message.member.roles.cache.find(r => r.name === `${modrole}`)) 
    {
        message.channel.send('SoftKill '+!softkill)
        return !softkill;
    }
}

//Adds function to bypass filter with a bypass toggle command!
async function bypass(message, bypass) 
{
    if (message.author.id !== `${brendanid}`) return bypass;
    
    message.channel.send('Caps Bypass: '+!bypass)
    return !bypass;
}

async function quotecatcher(message, client)
{
    
    fs.appendFile('incommingcsquotes.txt', "\n", (err) => {
        if (err) throw err;
    });

    fs.appendFile('incommingcsquotes.txt', JSON.stringify(message.content), 'utf8', (err) => {
        if (err) throw err;
    });

    const regex = new RegExp('([\"\'].+[\'\"])+( *)(-+)( *)(.+)');
                            //Ignore errors here

    if (regex.test(message.content)) {
        approveQuote(message.content, client);
    }
}

async function approveQuote(quote, client) 
{
    client.channels.cache.get(`${approveQuotesChannel}`).send(quote)
        .then(function (message) {
            message.react('👍').then(() => message.react('👎'));

            var modUsers = {}
            message.guild.roles.cache.forEach(role => modUsers[role.name] = role.members);

            var modIds = [];
            modUsers[modrole].forEach(user => modIds.push(user['id']));
            const filter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && modIds.includes(user.id);
            };

            message.awaitReactions(filter, { max: 1 })
                .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '👍') {
                        message.channel.send('You have approved the quote!');

                        var name = './logs/quotes.json';
                        var json = JSON.parse(fs.readFileSync(name).toString());
                        json['teacherQuotes'].push(message.content)

                        fs.writeFileSync(name, JSON.stringify(json));

                    } else {
                        message.channel.send('You have disapproved the quote.');
                    }
                })
        });
}

//Function to protect our chats from caps :D.  Full credit to Ryan Kim on this one!  Bypassed with tb or bypass commands
async function capsProtect(input) 
{
  var capTolerance = .25; //How lenient the protection is for caps
  var capCount = 0;
  for (var i = 0 ; i < input.length; i++) 
  {
      if (/[A-Z]/.test(input[i])) 
      {
          capCount++;
      }
  }
  if (capCount > capTolerance * input.length && capCount > 8) 
  {
      return false;
  }
  return true;
}

module.exports = { kill, soft_kill, bypass, quotecatcher, capsProtect, approveQuote, cronjob, chatlogger, tempbypasscommand, CapsChecker };