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
                const { name = '', input = 'N/A', startup = 'N/A', active = 'N/A', onHit = 'N/A', onBlock = 'N/A', recovery = 'N/A'} = move;
                moveString = `${name}\n${input}\nStart-up: ${startup}\tActive: ${active}\tOn-Hit: ${onHit}\tOn-Block: ${onBlock}\tRecovery: ${recovery}\n\n\n`;
            });
            messageString = messageString.concat(`${name}\n${description}\n\nMoves:\n${moveString}\n\n`);
        }
        await message.send(messageString);
        await interaction?.reply({content: 'DM sent', ephemeral: true});
    }
}

exports.handleCharacterCommand = handleCharacterCommand;