//Function that shuts down bot on kill command by specific user!
function kill(message) 
{                               //Brendan User ID                             //Ryan Kim user ID
    if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) return;
        message.channel.send('Stopping the bot as per exclusive admin command!').then(() => 
        {
            process.exit(1);
        })
}

//Function that makes bot unresponsive to commands until repeat of softkill command!
function soft_kill(message, softkill) 
{
    if(message.member.roles.cache.find(r => r.name === "Mod")) 
    {
        message.channel.send('SoftKill '+!softkill)
        return !softkill;
    }
}

//Adds function to bypass filter with a bypass toggle command!
function bypass(message, bypass) 
{                               //Brendan User ID                             //Andreaka Jump user ID
    if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) return bypass;
    
    message.channel.send('Caps Bypass: '+!bypass)
    return !bypass;
}

module.exports = {kill, soft_kill, bypass};