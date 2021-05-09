function autoCodeBlock(message) {
    const regex = new RegExp('({[^]*})');

    //If there is a matching set of brackets - might be code
    console.log(message.content);
    console.log(message.content.match(regex))

    if (message.content.match(regex) && message.content.match(regex).length > 0 && !message.content.includes("```")) {
        var reply = "It seems like that message might contain some unformatted code, I did my best to format it for you. If this is unwanted, click the thumbs down and this will be deleted.";

        reply += "\n```java\n";
        reply += message.content;
        reply += "\n```\n";
        reply += "(If you are curious how to do this, check out https://www.codegrepper.com/code-examples/whatever/discord+syntax+highlighting)";
        
        message.channel.send(reply).then(function (message) {
            message.react('👎');

            const filter = (reaction, user) => {
                return ['👎'].includes(reaction.emoji.name) && !user.bot;
            };

            message.awaitReactions(filter, { max: 1 })
                .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '👎') {
                        message.delete();
                    }
                })
        });
    }
}

module.exports = { autoCodeBlock };