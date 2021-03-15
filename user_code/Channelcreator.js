const { prefix } = require('../config.json')
const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');

function csvparse(message)
{
    fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => { 
    var Subj =  `${row["Subj"]}`;
    var Crse =  `${row["Crse"]}`;
    var time =  `${row["Time"]}`;
    var name =  `${row["Instructor"]}`;
    var instructorarray = name.replace("(P)", "").trim().split(" ");
    var lastnamepos = (instructorarray.length -1);
    var channelname = `${Subj}-${Crse}-${instructorarray[lastnamepos]} at time ${time}`;
    var rolename =  `${Subj} ${Crse}`;

    const readInterface = readline.createInterface(
    {
        input: fs.createReadStream('./categories.txt'),
        output: process.stdout,
        console: false
    });

    readInterface.on('line', function(line) 
    {
        var semester = ('Summer 2021')
        message.guild.channels.create(`${line} ${semester}`, { type: 'category' });

        if(line == rolename)
        {
            createchannel(channelname, message)
        }
    })
    })
    
    .on('end', () => {
    console.log('CSV file successfully processed');
    });
}

function categorycreator(message)
{
    const readInterface = readline.createInterface({
        input: fs.createReadStream('./categories.txt'),
        output: process.stdout,
        console: false
    });

    readInterface.on('line', function(line) {
        var semester = ('Summer 2021')
        message.guild.channels.create(`${line} ${semester}`, { type: 'category' });
    });
}

function createchannel(name, message)
{
    message.guild.channels.create(name, { reason: 'Needed a cool new channel' }).then(channel => {
        channel.setParent(line);
    });
}

async function deletechannel (message)
{
    message.guild.channel.delete();
    
    OR

    message.guild.channels.cache.forEach(channel => {
        if(channel.id!==('819417318735609876') && channel.id!==('819417259147264041') && channel.id!==('819417716959215636') && channel.id!==('819684941255671868') && channel.id!==('819417299828211733')){
        channel.delete()}});
}

function deletecategory(message)
{
    message.guild.channels.cache.forEach(category => {
        if(channel.id!==('819417318735609876') && channel.id!==('819417259147264041') && channel.id!==('819417716959215636') && channel.id!==('819684941255671868') && channel.id!==('819417299828211733')){
        category.delete()}});
}

module.exports = { csvparse, createchannel, deletechannel, categorycreator, deletecategory};
