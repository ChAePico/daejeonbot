const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandDir = './commands';
//const commandSubDir = fs.readdirSync(commandDir);
const commandFiles = fs.readdirSync(commandDir).filter(file=>file.endsWith('.js'));
//const commandFiles={};
// for(const subDir of commandSubDir){
// 	commandFiles[subDir]=fs.readdirSync(commandDir+'/'+subDir).filter(file=>file.endsWith('.js'));
// }
//console.log(commandFiles);

for(const file of commandFiles){
	const command=require(`${commandDir}/${file}`);
	commands.push(command.data.toJSON());
}
// for(const folderName in commandFiles){
// 	for(const file of commandFiles[folderName]){
// 		const command=require(`${commandDir}/${folderName}/${file}`);
// 		commands.push(command.data.toJSON());
// 	}
// }
//console.log(commands);

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);