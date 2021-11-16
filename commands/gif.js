const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
//const { MessageAttachment } = require('discord.js'); 

module.exports={
    data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('Server Custom GIF')
    .addStringOption(option=>option.setName('gif-name').setDescription('Type GIF Name')),
    async execute(interaction){
        const gifName=interaction.options.getString('gif-name');
        //console.log(gifName);
        const list=fs.readdirSync(path.resolve(__dirname, '../images/gifs')).filter(file=>file.endsWith('.gif')).join('\n');
        //console.log(list);
        //console.log(path.resolve(__dirname, '../images/gifs'));
        if(gifName){
            if(list.indexOf(gifName+'.gif')!=-1){
                const file = new MessageAttachment(path.resolve(__dirname, `../images/gifs/${gifName}.gif`));
                const embed = new MessageEmbed()
				    .setColor('#0099ff')
				    .setTitle(`${gifName}.gif`)
				    .setImage(`attachment://${gifName}.gif`);
                return interaction.reply({embeds: [embed], files: [file]});
            }
            return interaction.reply(`There's no gif name ${gifName}`);
        }
        return interaction.reply(list);
        
        
        //console.log(attach)
        //interaction.reply(`${gifName}`, attach);
    }
};