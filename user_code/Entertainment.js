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
  
    message.reply(`${reactionEmoji}`);
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
    var quotes = 
    [
        "https://tenor.com/view/do-it-star-wars-gif-4928619",
        "Push yourself, because no one else is going to do it for you.",
        "If you see a chance to be kind to someone tomorrow, take it. I think we need it. -Brad Pitt",
        "If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much.",
        "Life is 10% what happens to you and 90% how you react to it.",
        "Problems are not stop signs, they are guidelines. -Elon Musk",
        "If you fell down yesterday, stand up today. -H.G. Wells",
        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. — Malcolm X",
        "Education is the most powerful weapon you can use to change the world.",
        "A person who never made a mistake never tried anything new. — Albert Einstein",
        "Learning is never done without errors and defeat. – Vladimir Lenin",
        "Procrastination makes easy things hard and hard things harder.",
        "You don’t have to be great to start, but you have to start to be great.",
        "The way to get started is to quit talking and begin doing. – Walt Disney",
        "The best way to predict your future is to create it. —Abraham Lincoln",
        "The future belongs to those who believe in the beauty of their dreams. ― Eleanor Roosevelt",
        "You are braver than you believe, stronger than you seem and smarter than you think.",
        "Learn from yesterday. Live for today. Hope for tomorrow. – Albert Einstein",
        "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever. — Chinese Proverb",
    ]
    var index = getRandomInt(quotes.length - 1);
    message.channel.send(quotes[index]);
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {motivateme, ce};