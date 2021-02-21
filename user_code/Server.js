//Function that shuts down bot on kill command by specific user!
const { brendanid, ryanid, modrole }= require('../ids.json');
const fs = require('fs');


function kill(message) 
{
    if ((message.author.id !== `${brendanid}`)&&(message.author.id !== `${ryanid}`)) return;
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
    if (message.author.id !== `${brendanid}`) return bypass;
    
    message.channel.send('Caps Bypass: '+!bypass)
    return !bypass;
}

async function quotecatcher(text)
{
    
    fs.appendFile('incommingcsquotes.txt', "\n", (err) => {
        if (err) throw err;
        console.log(`Applying NewLine`);
    });

    fs.appendFile('incommingcsquotes.txt', JSON.stringify(text), 'utf8', (err) => {
        if (err) throw err;
        console.log(`${text} ...... saved!`);
    });
}

//Function to protect our chats from caps :D.  Full credit to Ryan Kim on this one!  Bypassed with tb or bypass commands
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

module.exports = {kill, soft_kill, bypass, quotecatcher, capsProtect};



