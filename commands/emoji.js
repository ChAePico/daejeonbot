const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
//const { MessageAttachment } = require('discord.js'); 

module.exports={
    data: new SlashCommandBuilder()
    .setName('emoji')
    .setDescription('Server Custom emoji')
    .addStringOption(option=>option.setName('emoji-name').setDescription('Type Emoji Name')),
    async execute(interaction){
        const gifName=interaction.options.getString('emoji-name');
        //console.log(gifName);
        const list=fs.readdirSync(path.resolve(__dirname, '../images/pngs')).filter(file=>file.endsWith('.png')).join('\n');
        //console.log(list);
        //console.log(path.resolve(__dirname, '../images/gifs'));
        if(gifName){
            if(list.indexOf(gifName+'.png')!=-1){
                const file = new MessageAttachment(path.resolve(__dirname, `../images/pngs/${gifName}.png`));
                const embed = new MessageEmbed()
				    .setColor('#0099ff')
				    .setTitle(`${gifName}.png`)
				    .setImage(`attachment://${gifName}.png`);
                return interaction.reply({embeds: [embed], files: [file]});
            }
            return interaction.reply(`There's no gif name ${gifName}`);
        }
        return interaction.reply(list);
        
        
        //console.log(attach)
        //interaction.reply(`${gifName}`, attach);
    }
};