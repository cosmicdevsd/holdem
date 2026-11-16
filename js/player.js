export class Player {

    constructor(name, isBot = false) {

        this.name = name;
        this.isBot = isBot;

        this.hand = [];

        this.chips = 1000;

        this.folded = false;
    }

}
