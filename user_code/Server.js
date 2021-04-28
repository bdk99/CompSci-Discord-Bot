//Function that shuts down bot on kill command by specific user!
const { brendanid, modrole, generalchat, chatloggerchannel }= require('../ids.json');
const { prefix } = require('../config.json')
const cron = require('cron');

//Temp caps filter bypass (DISABLED)
                                // function tempbypasscommand(message)
                                // {
                                //     if(message.member.roles.cache.find(r => r.name === `${modrole}`))
                                //     {
                                //       var args = message.content.slice(3).trim();
                                //       message.channel.send(`${args} by: ${message.author.username}`);
                                //     }
                                //     else 
                                //     {
                                //       message.delete({ timeout: 2000 });
                                //       console.log("Deleting message: "+message.content);
                                //       return;
                                //     }
                                // }

//Sends a professor quote in General at 9 AM
function cronjobs(client)
{
    var date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    
      let cronjob = new cron.CronJob('00 00 13 * * *', () => {
        //CRON JOBS ARE IN UTC TIME!  EST TIME + 4 or 5 HOURS
        //DO NOT CHANGE ANYTHING IN THIS FUNCTION UNLESS YOU KNOW WHAT YOU ARE DOING! 
        client.channels.cache.get(`${generalchat}`).send(`${prefix}quote`); 
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
      });

      //Runs at midnight on Sunday EST
      let cronjob2 = new cron.CronJob('0 0 4 * * 0', () => {
        //CRON JOBS ARE IN UTC TIME!  EST TIME + 4 or 5 HOURS
        //DO NOT CHANGE ANYTHING IN THIS FUNCTION UNLESS YOU KNOW WHAT YOU ARE DOING! 
        console.log(`Cronjob2 executing at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        let server = client.guilds.cache.get('707293853958275125')
        var memberRole= server.roles.cache.find(role => role.name === "focusmode")
        let member = server.members.cache.get('446768827448033290')
        
        member.roles.add(memberRole)

      });

      //Runs at 9 am on Monday Morning EST
      let cronjob3 = new cron.CronJob('0 0 13 * * 1', () => {
        //CRON JOBS ARE IN UTC TIME!  EST TIME + 4 or 5 HOURS
        //DO NOT CHANGE ANYTHING IN THIS FUNCTION UNLESS YOU KNOW WHAT YOU ARE DOING! 
        console.log(`Cronjob3 executing at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        let server = client.guilds.cache.get('707293853958275125')
        var memberRole= server.roles.cache.find(role => role.name === "focusmode")
        let member = server.members.cache.get('446768827448033290')
      
        member.roles.remove(memberRole);
      });

    cronjob.start()
    cronjob2.start()
    cronjob3.start()
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
function soft_kill(message, softkill) 
{
  if(message.member.roles.cache.find(r => r.name === `${modrole}`)) 
  {
    message.channel.send('SoftKill '+!softkill)
    return !softkill;
  }
}

//Adds function to bypass filter with a bypass toggle command!
function bypass(message, bypass) 
{
  if(message.member.roles.cache.find(r => r.name === `${modrole}`)) 
  {    
    message.channel.send('Caps Bypass: '+!bypass)
    return !bypass;
  }
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
function chatlogger(client, message)
{
  if((message.channel.id != `${chatloggerchannel}`) && (! message.content.startsWith(`${prefix}`)))
  {   //Adds a text logger.... so all messages from all channels will spit out in this channel
    console.log(`${message.content} ----> By ${message.author.username} in ${message.channel.name}`);
    client.channels.cache.get(`${chatloggerchannel}`).send(`${message.content} ----> By ${message.author.username} in <#${message.channel.id}>`); 
  }
}

module.exports = { kill, soft_kill, bypass, capsProtect, cronjobs, chatlogger };