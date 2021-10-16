import {BaseResource} from "./base.resource";

export class Move extends BaseResource {
    input: string;
    startup?: number;
    active?: number;
    onHit?: number;
    onBlock?: number;
    recovery?: number;

    constructor(id: string, name: string, input: string) {
        super(id, name);
        this.input = input;
    }
}