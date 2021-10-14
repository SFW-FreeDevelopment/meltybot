const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('meltybot').setDescription('Replies with test!')
        .addSubcommand(subcommand => subcommand
            .setName('red')
            .setDescription('red'))
        .addSubcommand(subcommand => subcommand
            .setName('blue')
            .setDescription('blue')),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);


rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    }
    else if (commandName === 'meltybot') {
        if (interaction.options.getSubcommand() === 'red') {
            await interaction.reply(`Hi I'm the red MeltyBot!`);
        }
        else if (interaction.options.getSubcommand() === 'blue') {
            await interaction.reply(`Hi I'm the blue MeltyBot!`);
        }
    }
});

client.login(token);