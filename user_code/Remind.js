var mysql = require('mysql');
var dateparser = require('dateparser');

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

async function remindme(message) {
    var time = message.content.replace("!remindme ", "");
    var result = dateparser.parse(time);

    if (result == null) {
        await message.lineReply("Sorry, I couldn't understand that time. Try something like '1 minute' or '3 days'");
        return;
    }

    var seconds = result["value"] / 1000

    var connection = mysql.createConnection('mysql://customer_168393_reminders:0XRWn8I$H2vDmjXDUYzw@na05-sql.pebblehost.com/customer_168393_reminders');

    connection.query('INSERT INTO reminders (author, message_id, remind_time) VALUES (?, ?, ?)', [message.author.username, message.id, mysql.raw("NOW() + INTERVAL "+ seconds.toString() +" SECOND")], function (error, results, fields) {
        console.log(error);
    });


    message.lineReply("Okay, I'll remind you in " + time);

    connection.end(function(err) {
        // The connection is terminated now
    });

}

async function checkReminders(client) {
    var connection = mysql.createConnection('mysql://customer_168393_reminders:0XRWn8I$H2vDmjXDUYzw@na05-sql.pebblehost.com/customer_168393_reminders');

    connection.query('SELECT * FROM reminders WHERE remind_time <= NOW()', async function (error, results, fields) {
        if (!results) {
            return;
        }
        results.forEach(async function(res) {

            client.guilds.cache.forEach(async function (guild) {
                guild.channels.cache.forEach(async function (channel) {
                    var msg = null;
                    try {
                        msg = await channel.messages.fetch(res.message_id);
                        msg.lineReply("Reminded.");
                    } catch (error) {}
                    });
            });
        });
    });

    connection.query('DELETE FROM reminders WHERE remind_time <= NOW()', function (error, results, fields) {
        
    });


    connection.end(function(err) {
        // The connection is terminated now
    });
}

module.exports = { remindme, checkReminders };