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
    var channelname = `${Subj}-${Crse}-${instructorarray[lastnamepos]}`;
    var rolename =  `${Subj} ${Crse}`;


    createchannel(channelname,message)
    console.log(`Created Channel: ${channelname}`);
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

    readInterface.on('line', function(line) 
    {
        var semester = ('Summer 2021')
        message.guild.channels.create(`${line} ${semester}`, { type: 'category' });
    });    
}

function createchannel(name, message)
{
    message.guild.channels.create(name, { reason: 'Needed a cool new channel' })
    .then(channel => {
        let category = message.guild.channels.cache.find(c => c.name == "Summer 2021" && c.type == "category");
    
        if (!category) throw new Error("Category channel does not exist");
        channel.setParent(category.id);
      }).catch(console.error);
}

async function deletechannel(message)
{
    message.guild.channels.cache.forEach(channel => {
        if((channel.id!==('823034099925123092') && channel.id!==('823034119167672340') && channel.id!==('823034112155189268') && channel.id!==('823034145868349470'))){
        channel.delete()}});
}

function deletecategory(message)
{
    message.guild.channels.cache.forEach(category => {
        if(category.id !== ('823029672630943757'))
        {
        category.delete()}});
}

async function swapper(name, message)
{
    let category = message.guild.channels.cache.find(c => c.name == "Text Channels" && c.type == "category"),
    channel = message.guild.channels.cache.find(c => c.name == `${name}` && c.type == "text");
  
  if (category && channel) channel.setParent(category.id);
  else console.error(`One of the channels is missing:\nCategory: ${!!category}\nChannel: ${!!channel}`);
}


async function channelsort(message)
{
    var textchannels = {} = message.guild.channels.cache.forEach(c => c.type == "text");

}


module.exports = { csvparse, createchannel, deletechannel, categorycreator, deletecategory, swapper, channelsort};
