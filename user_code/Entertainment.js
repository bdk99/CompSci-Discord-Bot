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
async function ce(message) 
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
async function motivateme(message) 
{
    var quotes = jsonData.motivationalQuotes;
    
    var index = getRandomInt(quotes.length - 1);
    message.channel.send(quotes[index]);
}

//Function for Teacher quotes!  DO NOT REMOVE
async function quote(message) 
{
    var quotes2 = jsonData.teacherQuotes;
    var filteredQuotes = []
    console.log(message.content);
    if (message.content.length > 6) {
        var search = message.content.replace("!quote ", "");

        quotes2.forEach(function(quote) {
            if (quote.toLowerCase().includes(search.toLowerCase()) {
                filteredQuotes.push(quote);
            }
        });  
    } else {
        filteredQuotes = quotes2;
    }
    
    if (filteredQuotes.length > 0) {
        var index = getRandomInt(filteredQuotes.length - 1);
        message.channel.send(filteredQuotes[index]);
    } else {
        var sarcasticResponses = [
            "Wow. That was a bad search, try again.",
            "Hot damn you suck at searching for quotes.",
            "Sverdlik would give you a 0/100 on that search.",
            "Not even our CS profs could come up with a quote that contains that weird-ass search.",
            "You really need to work on your searches.",
            "Roses are read, violets are blue, searching for valid quotes is something you can't really do.",
            "You should stick to whatever you were doing before you tried searching for whatever THAT was. Wow.",
            "Geez, I tried so hard to find a quote for that search but it was SO bad that even I couldn't find anything.",
            "I usually try to stay PG but holy $#|T that was an obscure search.",
            "You should really let someone who knows what they're doing search for quotes.",
            "Yeah I'm just gonna pretend I didn't see that horrible search you just did right there."
        ];
        message.reply(sarcasticResponses[getRandomInt(sarcasticResponses.length - 1)]);
    }
    
}

//Function that makes people laugh
async function makemelaugh(message) 
{
    var quotes = jsonData.makeMeLaugh;
    
    var index = getRandomInt(quotes.length - 1);
    message.channel.send(quotes[index]);
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

async function RateProfessor(message)
{
    var arg = message.content.slice(6).trim();
    var profname = arg.substr(0,arg.indexOf(' '));

    fs.readFile('./user_code/professors/professors.txt', function (err, data) 
    {
        if (err) throw err;
        if (data.includes(profname))
        {
            var review = arg.substr(arg.indexOf(' ')+1);

            var file = ('./user_code/professors/' + profname.toLowerCase() + '.txt').toString().split("\n");

            message.channel.send('Adding' +review+' review to '+profname)
            fs.appendFile(`${file}`,"\n"+JSON.stringify(`${review}`), 'utf8', (err) => {
                if (err) throw err;
            });
        }
        else 
        {
            message.channel.send("Sorry, that professor does not exist!");
        }
    });
}

async function viewRatings(message) 
{   
    var viewprofName = message.content.slice(12).trim();
    fs.readFile('./user_code/professors/professors.txt', function (err, data) 
    {
        if (err) throw err;
        if(data.includes(viewprofName)){
            var textByLine = fs.readFileSync('./user_code/professors/' + viewprofName.toLowerCase() + '.txt').toString().split("\n");
            message.channel.send(textByLine);
        }
        else 
        {
            message.channel.send("Sorry, that professor does not exist!")
        }
    });
    
}

module.exports = {motivateme, ce, quote, makemelaugh, RateProfessor, viewRatings};