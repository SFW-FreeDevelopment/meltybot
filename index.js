const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const characters = [
    {
        name: 'Saber',
        description: 'You know.'
    },
    {
        name: 'Arcueid',
        description: 'You know.'
    }
];

const commands = [
    new SlashCommandBuilder().setName('meltybot').setDescription('Replies with test!')
        .addSubcommandGroup(subcommandGroup => subcommandGroup
            .setName('character')
            .setDescription('Character data')
            .addSubcommand( subcommand => subcommand
                .setName('all')
                .setDescription('All character data')
            )
            .addSubcommand( subcommand => subcommand
                .setName('test')
                .setDescription('All test character data')
            ))
        .addSubcommand(subcommandGroup => subcommandGroup
            .setName('system')
            .setDescription('System data')),
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
        let group = interaction?.options?.data?.find(g => g?.name === 'character');
        let subCommand = '';

        console.log(interaction);
        console.log(group);
        console.log(subCommand?.name);

        if (group && subCommand) {
            let message = await interaction?.user.createDM();
            await message.send(`You'll eventually get ${subCommand?.name} character data`);
            //await interaction?.deferReply();
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