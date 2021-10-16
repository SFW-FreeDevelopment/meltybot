import {Move} from './move';
import {BaseResource} from './base.resource';

export class Character extends BaseResource {
    moves?: Move[]

    constructor(id: string, name: string) {
        super(id, name);
    }
}

//module.exports.Character = Character;