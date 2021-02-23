const { Member } = require('discord.io');
const fs = require('fs');
const { userInfo } = require('os');
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

function RateProfessor(message)
{
    var arg = message.content.slice(6).trim();
    var profname = arg.substr(0,arg.indexOf(' ')); // "72"

    fs.readFile('./user_code/professors/professors.txt', function (err, data) {
        if (err) throw err;
        if (data.includes(profname)){
            var review = arg.substr(arg.indexOf(' ')+1); // "tocirah sneab"

            console.log('profname '+ profname);
            console.log('Review '+ arg);

            var file = ('./user_code/professors/' + profname.toLowerCase() + '.txt').toString().split("\n");

            var profnamelength = profname.length;
            console.log('Professor name length '+profnamelength);

            console.log('Final professor review is... '+review);

            fs.appendFile(`${file}`,"\n"+JSON.stringify(`${review}`), 'utf8', (err) => {
                if (err) throw err;
            });
        }
        else {
            message.channel.send("Sorry, that professor does not exist!");
        }
    });
}

async function viewRatings(message) 
{   
    var viewprofName = message.content.slice(12).trim();
    fs.readFile('./user_code/professors/professors.txt', function (err, data) {
        if (err) throw err;
        if(data.includes(viewprofName)){
            var textByLine = fs.readFileSync('./user_code/professors/' + viewprofName.toLowerCase() + '.txt').toString().split("\n");
            message.channel.send(textByLine);
        }
        else {
            message.channel.send("Sorry, that professor does not exist!")
        }
    });
    
}

async function focus(message) {
    var parameter = message.content.slice(10).trim();
    var timeString = parameter.substr(0,parameter.indexOf(' '));
    var time = parseInt(timeString);
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    var timeStatement;
    var jstime;

    if (message.content.includes("second") || message.content.includes("seconds")) {
        jstime = time * second;
        if (time == 1)
            timeStatement = time + " second";
        else timeStatement = time + " seconds";
    }
    else if (message.content.includes("minute") || message.content.includes("minutes")) {
        jstimetime = time * minute;
        if (time == 1)
            timeStatement = time + " minute";
        else timeStatement = time + " minutes";
    }
    else if (message.content.includes("hour") || message.content.includes("hours")) {
        jstime = time * hour;
        if (time == 1)
            timeStatement = time + " hour";
        else timeStatement = time + " hours";
    }
    else jstime = time * 0;

    let role = message.guild.roles.cache.find(role => role.name === "muted");
    message.member.roles.add(role).catch(console.error);
    message.channel.send('Focus Mode has been engaged for ' + timeStatement);
    
    setTimeout(() => {
        message.member.roles.remove(role).catch(console.error);
        message.channel.send('Focus mode has been disabled');
    }, jstime);
}

module.exports = {motivateme, ce, quote, makemelaugh, RateProfessor, viewRatings, focus};