const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const config = require('../config.json');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setrepo')
    .setDescription('Add a GitHub repository to track.')
    .addStringOption((option) =>
      option
        .setName('repository')
        .setDescription('GitHub repository in the format username/repo')
        .setRequired(true)
    ),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const repo = interaction.options.getString('repository');

    if (!config.repositoryNames.includes(repo)) {
      config.repositoryNames.push(repo);
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
      await interaction.reply(`Repository ${repo} added to the tracking list.`);
    } else {
      await interaction.reply(`Repository ${repo} is already in the tracking list.`);
    }
  },
};
