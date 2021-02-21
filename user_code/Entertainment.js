const fs = require('fs');
let jsonData = "";

fs.readFile('./user_code/quotes.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        console.log("Unable to read quotes json file");
    } else {
        jsonData = JSON.parse(data);
    }
})

//Function that reacts with all unique server emojis 
function ce(message) 
{
    const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'billtiger');
    const reactionEmoji2 = message.guild.emojis.cache.find(emoji => emoji.name === 'hackerevett');
    const reactionEmoji3 = message.guild.emojis.cache.find(emoji => emoji.name === '420');
    const reactionEmoji4 = message.guild.emojis.cache.find(emoji => emoji.name === '69');
    const reactionEmoji5 = message.guild.emojis.cache.find(emoji => emoji.name === 'potatojump');
    const reactionEmoji6 = message.guild.emojis.cache.find(emoji => emoji.name === 'billiam');
    const reactionEmoji7 = message.guild.emojis.cache.find(emoji => emoji.name === 'youngmanny');
    const reactionEmoji8 = message.guild.emojis.cache.find(emoji => emoji.name === 'CourtManny');
    const reactionEmoji9 = message.guild.emojis.cache.find(emoji => emoji.name === 'sillybilly');
    const reactionEmoji10 = message.guild.emojis.cache.find(emoji => emoji.name === 'santamanny');
    const reactionEmoji11 = message.guild.emojis.cache.find(emoji => emoji.name === 'billywow');
    const reactionEmoji12 = message.guild.emojis.cache.find(emoji => emoji.name === 'zhangy');
    const reactionEmoji13 = message.guild.emojis.cache.find(emoji => emoji.name === 'billy2');
    const reactionEmoji14 = message.guild.emojis.cache.find(emoji => emoji.name === 'manny');
    const reactionEmoji15 = message.guild.emojis.cache.find(emoji => emoji.name === 'billmoji');
    const reactionEmoji16 = message.guild.emojis.cache.find(emoji => emoji.name === 'tim');
  
    message.react(reactionEmoji);
    message.react(reactionEmoji2);
    message.react(reactionEmoji3);
    message.react(reactionEmoji4);
    message.react(reactionEmoji5);
    message.react(reactionEmoji6);
    message.react(reactionEmoji7);
    message.react(reactionEmoji8);
    message.react(reactionEmoji9);
    message.react(reactionEmoji10);
    message.react(reactionEmoji11);
    message.react(reactionEmoji12);
    message.react(reactionEmoji13);
    message.react(reactionEmoji14);
    message.react(reactionEmoji15);
    message.react(reactionEmoji16);
}
  
//Function that sends a motivation quote or meme
function motivateme(message) 
{
    var quotes = jsonData.motivationalQuotes;
    
    var index = getRandomInt(quotes.length - 1);
    message.channel.send(quotes[index]);
}

//Function for Teacher quotes!  DO NOT REMOVE
function quote(message) 
{
    var quotes2 = jsonData.teacherQuotes;
    
    var index = getRandomInt(quotes2.length - 1);
    message.channel.send(quotes2[index]);
}

//Function that makes people laugh
function makemelaugh(message) 
{
    var quotes = jsonData.makeMeLaugh;
    
    var index = getRandomInt(quotes.length - 1);
    message.channel.send(quotes[index]);
}


function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {motivateme, ce, quote, makemelaugh};