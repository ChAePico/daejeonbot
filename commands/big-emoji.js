const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('big-emoji')
		.setDescription('Show Big Emoji')
		.addStringOption(option=>option.setName('emoji').setDescription('type emoji')),
	async execute(interaction) {
		const message=interaction.options.getString('emoji');
		const guildEmoji=interaction.guild.emojis;
		let emojiStr='';
		guildEmoji.cache.each(emoji=>{
			emojiStr+=`<:${emoji.name}:${emoji.id}> `
		});
		const emojiIdx=emojiStr.indexOf(message);
		if(emojiIdx!==-1){
			const emojiIdStartIdx=emojiStr.indexOf(':', emojiIdx+2);
			const emojiIdEndIdx=emojiStr.indexOf('>', emojiIdx);
			const emojiId=emojiStr.substring(emojiIdStartIdx+1, emojiIdEndIdx);
			//console.log(emojiId, message);
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setAuthor(`${interaction.user.tag}'s Emoji`, `${interaction.user.displayAvatarURL({ dynamic: true })}`)
				.setImage(`https://cdn.discordapp.com/emojis/${emojiId}.png?v=1`);
			return interaction.reply({embeds: [embed]});
		}
		return interaction.reply("It's not server custom emoji");
		//guildEmoji.fetch().then(emojis=>interaction.reply(`There are ${emojis.size} emojis.\n${emojiStr}`)).catch(console.error);
		//return interaction.reply(`${emojiStr}`);
		//console.log(emojiStr);
		//`<:${emoji.name}:${emoji.id}>` : 이모지 출력 형식
	},
};