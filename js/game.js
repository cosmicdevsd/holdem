import { Deck } from "./deck.js";
import { Player } from "./player.js";

export class PokerGame {

    constructor() {

        this.deck = new Deck();

        this.players = [
            new Player("You"),
            new Player("Bot 1", true),
            new Player("Bot 2", true),
            new Player("Bot 3", true)
        ];

        this.communityCards = [];

        this.pot = 0;

        this.dealerPosition = 0;
    }

    startHand() {

        this.deck.build();

        this.deck.shuffle();

        this.communityCards = [];

        this.players.forEach(
            p => p.hand = []
        );

        for (let i = 0; i < 2; i++) {

            for (const player of this.players) {

                player.hand.push(
                    this.deck.deal()
                );

            }

        }

        for (let i = 0; i < 5; i++) {

            this.communityCards.push(
                this.deck.deal()
            );

        }

    }

}
