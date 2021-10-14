const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [
    new SlashCommandBuilder().setName('meltybot').setDescription('Replies with test!')
        .addSubcommand(subcommand => subcommand
            .setName('character')
            .setDescription('character'))
        .addSubcommand(subcommand => subcommand
            .setName('system')
            .setDescription('system')),
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

    if (commandName === 'meltybot') {
        if (interaction?.options.getSubcommand() === 'character') {
            let message = await interaction?.user.createDM();
            await message.send(`You'll eventually get character data`);
            await interaction?.reply({content: 'DM sent', ephemeral: true});
        }
        else if (interaction?.options.getSubcommand() === 'system') {
            let message = await interaction?.user.createDM();
            await message.send(`You'll eventually get system data`);
            await interaction?.reply({content: 'DM sent', ephemeral: true});
        }
    }
});

client.login(token);