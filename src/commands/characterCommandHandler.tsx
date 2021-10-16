import { Character } from "../models/character";
import {BaseCommandInteraction, CommandInteractionOption, Interaction} from "discord.js";
import {Move} from "../models/move";

const { characters: characterJson } = require('../resourceJson/characters.json');
const characters = characterJson as Character[];

export const handleCharacterCommand = async (subCommandArray:  CommandInteractionOption[], interaction: BaseCommandInteraction) => {
    if (subCommandArray.some(sc => sc.name === 'all')) {
        console.log(characters);
        const { user } = interaction;
        const message = await user.createDM();
        let messageString = '';
        for (const character of characters) {
            const { name = '', description = 'N/A', moves = [] } = character;
            let moveString = '';
            console.log(character)
            moves?.forEach( (move: Move) => {
                let { name, input = 'N/A', startup = 'N/A', active = 'N/A', onHit = 'N/A', onBlock = 'N/A', recovery = 'N/A'} = move;
                if (name) {
                    name = `**${name}**\n`;
                    moveString = moveString.concat(`${name}`);
                }
                moveString = moveString.concat(`${input}\n***Start-up***: ${startup}\t***Active***: ${active}\t***On-Hit***: ${onHit}\t***On-Block***: ${onBlock}\t***Recovery***: ${recovery}\n\n\n`);
            });
            messageString = messageString.concat(`**${name}**\n\n__***Moves***__\n${moveString}\n\n`);
        }
        await message.send(messageString);
        await interaction?.reply({content: 'DM sent', ephemeral: true});
    }
}

exports.handleCharacterCommand = handleCharacterCommand;