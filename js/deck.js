export class Deck {

    constructor() {
        this.cards = [];
    }

    build() {

        this.cards = [];

        const suits = [
            "H",
            "D",
            "C",
            "S"
        ];

        const ranks = [
            "A",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "J",
            "Q",
            "K"
        ];

        for (const suit of suits) {

            for (const rank of ranks) {

                this.cards.push({
                    rank,
                    suit
                });

            }

        }

    }

    shuffle() {

        for (let i = this.cards.length - 1; i > 0; i--) {

            const random = new Uint32Array(1);

            crypto.getRandomValues(random);

            const j = random[0] % (i + 1);

            [
                this.cards[i],
                this.cards[j]
            ] = [
                this.cards[j],
                this.cards[i]
            ];

        }

    }

    deal() {
        return this.cards.pop();
    }

}