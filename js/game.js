import { Deck } from "./deck.js";
import { Player } from "./player.js";
import { determineWinner } from "./evaluator.js";

export class PokerGame {

    constructor() {

        this.deck = new Deck();

        this.players = [
            new Player("You"),
            new Player("Bot 1", true),
            new Player("Bot 2", true),
            new Player("Bot 3", true)
        ];

        this.smallBlind = 5;
        this.bigBlind = 10;

        this.pot = 0;

        this.communityCards = [];

        this.street = "preflop";

        this.currentBet = this.bigBlind;

        this.lastWinner = null;

        this.dealerPosition =
            Math.floor(
                Math.random() *
                this.players.length
            );

        this.smallBlindPosition = 0;
        this.bigBlindPosition = 0;

        this.assignBlindPositions();

    }

    assignBlindPositions() {

        this.smallBlindPosition =
            (
                this.dealerPosition + 1
            ) %
            this.players.length;

        this.bigBlindPosition =
            (
                this.dealerPosition + 2
            ) %
            this.players.length;

    }

    startHand() {

        this.pot = 0;

        this.currentBet =
            this.bigBlind;

        this.street =
            "preflop";

        this.communityCards = [];

        this.lastWinner = null;

        this.deck.build();

        this.deck.shuffle();

        for (const player of this.players) {

            player.hand = [];

            player.folded = false;

            player.handResult = null;

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

        this.postBlinds();

    }

    postBlinds() {

        const sb =
            this.players[
                this.smallBlindPosition
            ];

        const bb =
            this.players[
                this.bigBlindPosition
            ];

        sb.chips -=
            this.smallBlind;

        bb.chips -=
            this.bigBlind;

        this.pot +=
            this.smallBlind +
            this.bigBlind;

    }

    getVisibleCommunityCards() {

        switch (this.street) {

            case "preflop":
                return [];

            case "flop":
                return this.communityCards.slice(0, 3);

            case "turn":
                return this.communityCards.slice(0, 4);

            case "river":
                return this.communityCards.slice(0, 5);

            case "showdown":
                return this.communityCards;

            default:
                return [];

        }

    }

    advanceStreet() {

        switch (this.street) {

            case "preflop":
                this.street = "flop";
                return;

            case "flop":
                this.street = "turn";
                return;

            case "turn":
                this.street = "river";
                return;

            case "river":

                this.street =
                    "showdown";

                this.awardPot();

                return;

        }

    }

    awardPot() {

        const winner =
            determineWinner(
                this.players,
                this.communityCards
            );

        winner.chips +=
            this.pot;

        this.lastWinner =
            winner;

        this.pot = 0;

    }

    aiDecision() {

        const random =
            new Uint32Array(1);

        crypto.getRandomValues(
            random
        );

        const roll =
            random[0] % 100;

        if (roll < 20)
            return "fold";

        if (roll < 80)
            return "call";

        return "raise";

    }

    nextHand() {

        this.dealerPosition =
            (
                this.dealerPosition + 1
            ) %
            this.players.length;

        this.assignBlindPositions();

        this.startHand();

    }

    getDealer() {

        return this.players[
            this.dealerPosition
        ];

    }

    getSmallBlindPlayer() {

        return this.players[
            this.smallBlindPosition
        ];

    }

    getBigBlindPlayer() {

        return this.players[
            this.bigBlindPosition
        ];

    }

}
