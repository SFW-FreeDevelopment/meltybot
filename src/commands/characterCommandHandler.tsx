import { Character } from "../models/character";
import {BaseCommandInteraction, CommandInteractionOption, Interaction} from "discord.js";
import {Move} from "../models/move";

const { characters: characterJson } = require('../resourceJson/characters.json');
const characters = characterJson as Character[];

export const handleCharacterCommand = async (subCommandArray:  CommandInteractionOption[], interaction:BaseCommandInteraction) => {
    if (subCommandArray.some(sc => sc.name === 'all')) {
        console.log(characters);
        const { user } = interaction;
        const message = await user.createDM();
        let messageString = '';
        for (const character of characters) {
            let moveString = '';
            console.log(character)
            character?.moves?.forEach( (move: Move) => {
                moveString = `${move.name}\n${move.input}\n\n`;
            });
            messageString = messageString.concat(`${character?.name}\n${character?.description}\n\n${moveString}\n\n`);
        }
        await message.send(messageString);
        await interaction?.reply({content: 'DM sent', ephemeral: true});
    }
}

exports.handleCharacterCommand = handleCharacterCommand;