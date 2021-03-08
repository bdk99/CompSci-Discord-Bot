//Function that shuts down bot on kill command by specific user!
const { brendanid, modrole, generalchat, chatloggerchannel }= require('../ids.json');
const { prefix } = require('../config.json')
const cron = require('cron');

//Caps filter bypass
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

//Sends a professor quote in General at 9 AM
function cronjobs(client)
{
    var date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

    let cronjob2 = new cron.CronJob('59 59 13 * * *', () => {
        //CRON JOBS ARE IN UTC TIME!  EST TIME + 5 HOURS
        //DO NOT CHANGE ANYTHING IN THIS FUNCTION UNLESS YOU KNOW WHAT YOU ARE DOING! 
        client.channels.cache.get(`${generalchat}`).send(`Here's your quote fuckers!`);
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      });
    
      let cronjob = new cron.CronJob('00 00 14 * * *', () => {
        //CRON JOBS ARE IN UTC TIME!  EST TIME + 5 HOURS
        //DO NOT CHANGE ANYTHING IN THIS FUNCTION UNLESS YOU KNOW WHAT YOU ARE DOING! 
        client.channels.cache.get(`${generalchat}`).send(`${prefix}quote`); 
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      });

    cronjob.start()
    cronjob2.start()
}

//The off switch for this entire ensemble
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

//Function to protect our chats from caps :D.  Full credit to Ryan Kim on this one!  
//Bypassed with tb or bypass commands
//DO NOT MAKE THIS FUNCTION ASYNC.... IT MUST MUST MUST BE SYNC
function capsProtect(input) 
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

//Logs messages into a general text logger channel
function chatlogger(message)
{
    if((message.channel.id != `${chatloggerchannel}`) && (! message.content.startsWith(`${prefix}`)))
    {   //Adds a text logger.... so all messages from all channels will spit out in this channel
      console.log(`${message.author.username} sent ${message.content} in ${message.channel.name}`);
      client.channels.cache.get(`${chatloggerchannel}`).send(`${message.author.username} sent ${message.content} in ${message.channel.name}`); 
    }
}

module.exports = { kill, soft_kill, bypass, capsProtect, cronjobs, chatlogger, tempbypasscommand };