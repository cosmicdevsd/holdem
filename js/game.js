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

        this.dealerPosition = 0;

        this.pot = 0;

        this.chips = {
            5: 20,
            10: 20,
            20: 20,
            50: 20,
            100: 20
        };
    }

    startHand() {

        this.deck.build();
        this.deck.shuffle();

        this.communityCards = [];

        for (const player of this.players) {
            player.hand = [];
        }

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
