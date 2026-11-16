import { Deck } from "./deck.js";
import { Player } from "./player.js";

export class PokerGame {

    constructor() {

        this.deck = new Deck();

        this.players = [
            new Player("You"),
            new Player("Bot 1")
        ];

        this.communityCards = [];

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