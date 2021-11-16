const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if(user){
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${user.username}'s Avatar`)
				.setDescription(`${user.username}'s profile image.`)
				.setURL(`${user.displayAvatarURL({ dynamic: true })}`)
				.setImage(`${user.displayAvatarURL({ dynamic: true})}`)
			return interaction.reply({embeds: [embed]});
		}
		const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Your Avatar`)
				.setDescription(`Your profile image.`)
				.setURL(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
				.setImage(`${interaction.user.displayAvatarURL({ dynamic: true})}`)
		return interaction.reply({embeds: [embed]});
	},
};