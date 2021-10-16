import {SlashCommandSubcommandGroupBuilder} from "@discordjs/builders";

const {SlashCommandBuilder} = require("@discordjs/builders");

const commands = [
    new SlashCommandBuilder().setName('meltybot').setDescription('Supplies data for Melty Blood Type Lumina')
        .addSubcommandGroup((subcommandGroup: SlashCommandSubcommandGroupBuilder) => subcommandGroup
            .setName('character')
            .setDescription('Character data')
            .addSubcommand( subcommand => subcommand
                .setName('all')
                .setDescription('All character data')
            ))
        .addSubcommandGroup((subcommandGroup: SlashCommandSubcommandGroupBuilder) => subcommandGroup
            .setName('system')
            .setDescription('System data')
            .addSubcommand( subcommand => subcommand
                .setName('all')
                .setDescription('All character data')
            )),
].map(command => command.toJSON());

exports.commands = commands;