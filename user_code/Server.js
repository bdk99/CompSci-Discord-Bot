//Function that shuts down bot on kill command by specific user!
const { brendanid, ryanid, modrole, approveQuotesChannel}= require('../ids.json');
const fs = require('fs');

async function kill(message) 
{
    if ((message.author.id !== `${brendanid}`)&&(message.author.id !== `${ryanid}`)) return;
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


    if (regex.test(message.content)) {
        approveQuote(message.content, client);
    }
}

async function approveQuote(quote, client) 
{
    client.channels.cache.get(`${approveQuotesChannel}`).send(quote)
        .then(function (message) {
            message.react('👍').then(() => message.react('👎'));

            modUsers = {}
            message.guild.roles.cache.forEach(role => modUsers[role.name] = role.members);

            modIds = [];
            modUsers[modrole].forEach(user => modIds.push(user['id']));
            const filter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && modIds.includes(user.id);
            };

            message.awaitReactions(filter, { max: 1 })
                .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '👍') {
                        message.channel.send('You have approved the quote!');

                        var name = './user_code/quotes.json';
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

module.exports = {kill, soft_kill, bypass, quotecatcher, capsProtect, approveQuote};



