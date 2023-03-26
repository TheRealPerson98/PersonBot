const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const fs = require('fs');

const bot = new Client({ intents: [Intents.FLAGS.Guilds] });

bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js') && !file.startsWith('_'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.data.name, command);
}

const commands = bot.commands.map(({ data }) => data.toJSON());

const rest = new REST({ version: '9' }).setToken(config.botToken);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(config.clientId), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

bot.once('ready', () => {
  console.log(`${bot.user.tag} is ready!`);
});

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  const command = bot.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    await interaction.reply({
      content: 'There was an error while executing this command.',
      ephemeral: true,
    });
  }
});

bot.login(config.botToken);
