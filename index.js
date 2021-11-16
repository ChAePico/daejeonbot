const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS] });

client.commands = new Collection();
const commandDir = './commands';
const commandFiles=fs.readdirSync(commandDir).filter(file=>file.endsWith('.js'));
for(const file of commandFiles){
	const command=require(`${commandDir}/${file}`);
	//console.log(command);
	client.commands.set(command.data.name, command);
}

const eventFiles=fs.readdirSync('./events').filter(file=>file.endsWith('.js'));
// When the client is ready, run this code (only once)
for(const file of eventFiles){
    const event=require(`./events/${file}`);
    if(event.once){
        client.once(event.name, (...args)=>event.execute(...args));
    }
    else{
        client.on(event.name, (...args)=>event.execute(...args));
    }
}

client.on('interactionCreate', async interaction=>{
    if(!interaction.isCommand()){
        return;
    }
    const command=client.commands.get(interaction.commandName);
    //console.log(command);
    if(!command){
        return;
    }
    try{
        await command.execute(interaction);
    }
    catch(error){
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

// client.on('messageCreate', message=>{
//     if(message.content==='ping'){
//         message.channel.send('pong');
//     }
// });

// Login to Discord with your client's token
client.login(token);