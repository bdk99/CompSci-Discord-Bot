//Function that shuts down bot
function kill(message) 
{
    if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) return;
        message.channel.send('Stopping the bot as per exclusive admin command!').then(() => 
        {
            process.exit(1);
        })
}
  
//Function that makes bot unresponsive to commands
function soft_kill(message, softkill) 
{
    if ((message.author.id !== '404717378715385856')&&(message.author.id !== '743957184924352542')) return;
        message.channel.send('SoftKill '+!softkill).then(() => 
        {
            softkill = !softkill;
        })
    return softkill;
}

//Function to protect our chats :D.  Full credit to Ryan Kim on this one!
function spamProtect(input) 
{
    if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(input)) {
      return true;
    }

    if (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(input)) {
      return true;
    }

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

module.exports = {kill, soft_kill, spamProtect};