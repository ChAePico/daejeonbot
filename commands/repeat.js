const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Repeat your words')
		.addIntegerOption(option=>option.setName('number').setDescription('Number of repetitions'))
		.addStringOption(option=>option.setName('words').setDescription('Words to repeat')),
	async execute(interaction) {
		const message=interaction.options.getString('words');
		const number=interaction.options.getInteger('number');
		if(message && number>0 && number<=10){
			return interaction.reply(`${message}\n`.repeat(number));
		}
		return interaction.reply('문자열과 10이하의 자연수를 넣으시오');
	},
};