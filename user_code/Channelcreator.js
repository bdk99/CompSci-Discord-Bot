const { prefix } = require('../config.json')
const fs = require('fs');
const csv = require('csv-parser');


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

    message.channel.send(`${channelname}`);
    createchannel(channelname, message)
    //message.channel.send(`${rolename}`)
    //console.log(str);
    })
    .on('end', () => {
    console.log('CSV file successfully processed');
    });
}


//Currently does not work
function createchannel (name, message)
{
    message.guild.channels
    .create(name, {
        type: 'text',
    })
    .then((channel)=>{
        console.log(channel)
        // const categoryId = '';
        // channel.setParent(categoryId);
    })
}

module.exports = { csvparse, createchannel };