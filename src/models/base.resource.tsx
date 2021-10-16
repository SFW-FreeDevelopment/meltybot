export abstract class BaseResource {
    id: string;
    name: string;
    description?: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}