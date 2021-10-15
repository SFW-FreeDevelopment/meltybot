const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');
const { Client, Intents } = require('discord.js');
const { characters } = require('./resourceJson/characters.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [
    new SlashCommandBuilder().setName('meltybot').setDescription('Supplies data for Melty Blood Type Lumina')
        .addSubcommandGroup(subcommandGroup => subcommandGroup
            .setName('character')
            .setDescription('Character data')
            .addSubcommand( subcommand => subcommand
                .setName('all')
                .setDescription('All character data')
            ))
        .addSubcommandGroup(subcommandGroup => subcommandGroup
            .setName('system')
            .setDescription('System data')
            .addSubcommand( subcommand => subcommand
                .setName('all')
                .setDescription('All character data')
            )),
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

    const { commandName, options, user } = interaction;

    console.log(JSON.stringify(interaction, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value));

    if (commandName === 'meltybot') {

        let groupArray = options?.data;

        console.log(JSON.stringify(groupArray));

        if (groupArray) {
            if (groupArray.some(g => g.name === 'character')) {
                const group = groupArray.find(g => g.name === 'character');
                console.log(group);
                console.log(group?.options);
                const message = await user.createDM();
                const subCommandArray = group?.options
                if (subCommandArray.some(sc => sc.name === 'all')) {
                    console.log(characters);
                    let messageString = '';
                    for (const character of characters) {
                        console.log(character)
                        messageString = messageString.concat(`Id: ${character?.id}\nName: ${character.name}\n\n`);
                    }
                    await message.send(messageString);
                    await interaction?.reply({content: 'DM sent', ephemeral: true});
                }
            }
            else if (groupArray.some(g => g.name === 'system')) {
                const group = groupArray.find(g => g.name === 'system');
                const message = await user.createDM();
                const subCommandArray = group?.options
                if (subCommandArray.some(sc => sc.name === 'all')) {
                    await message.send(`Nothing to see here!`);
                    await interaction?.reply({content: 'DM sent', ephemeral: true});
                }
                await message.send(`You'll eventually get system data`);
                await interaction?.reply({content: 'DM sent', ephemeral: true});
            }
        }
    }
});

client.login(token);