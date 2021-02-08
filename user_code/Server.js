//Function that shuts down bot
function kill(message) 
{                               //Brendan User ID                             //Ryan Kim user ID
    if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) return;
        message.channel.send('Stopping the bot as per exclusive admin command!').then(() => 
        {
            process.exit(1);
        })
}

//Function that makes bot unresponsive to commands
//Function that makes bot unresponsive to commands
function soft_kill(message, softkill) 
{                               //Brendan User ID                             //Ryan Kim user ID
    if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) return softkill;
    
    message.channel.send('SoftKill '+!softkill)
    return !softkill;
}

module.exports = {kill, soft_kill};