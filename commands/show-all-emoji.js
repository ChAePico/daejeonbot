const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show-all-emoji')
		.setDescription('Show All Emojis'),
	async execute(interaction) {
		const guildEmoji=interaction.guild.emojis;
		let emojiStr='';
		guildEmoji.cache.each(emoji=>{emojiStr+=`<:${emoji.name}:${emoji.id}>`});
		guildEmoji.fetch().then(emojis=>interaction.reply(`There are ${emojis.size} emojis.\n${emojiStr}`)).catch(console.error);
		//return interaction.reply(`${emojiStr}`);
		//console.log(emojiStr);
	},
};