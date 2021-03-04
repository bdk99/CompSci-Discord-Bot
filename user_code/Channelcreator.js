const { prefix } = require('../config.json')
const fs = require('fs');
const csv = require('csv-parser');
const { Client, Collection } = require('discord.js');


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

    createchannel(channelname, message)
    message.channel.send(`${channelname}`);
   
    //message.channel.send(`${rolename}`)
    //console.log(str);
    })
    .on('end', () => {
    console.log('CSV file successfully processed');
    });
}

//Currently does not work
async function createchannel (name, message)
{
    message.guild.channels.create(name, { reason: 'Needed a cool new channel' })
  .then(console.log)
  .catch(console.error);
}

async function deletechannel (message)
{
    message.guild.channels.cache.forEach(channel => {
        if(channel.id!==('816879956214153227') && channel.id!==('816879739876671529') && channel.id!==('816879565053493285') && channel.id!==('816882589116923914') && channel.id!==('816885593308004362')){
        channel.delete()}});
}

module.exports = { csvparse, createchannel, deletechannel};
