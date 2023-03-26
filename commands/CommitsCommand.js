const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const GitHubService = require('../services/GitHubService');
const config = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commits')
    .setDescription('Shows the latest commits from your GitHub repositories.')
    .addStringOption((option) =>
      option
        .setName('repository')
        .setDescription('Specific repository to show commits (username/repo)')
    ),
  /**
   * @param
