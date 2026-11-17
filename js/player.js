export class Player {

    constructor(
        name,
        isBot = false
    ) {

        this.name = name;

        this.isBot = isBot;

        this.chips = 1000;

        this.hand = [];

        this.folded = false;

        this.allIn = false;

        this.currentBet = 0;

        this.totalContribution = 0;

        this.lastAction = "Waiting";

        this.handResult = null;

    }

    resetForHand() {

        this.hand = [];

        this.folded = false;

        this.allIn = false;

        this.currentBet = 0;

        this.totalContribution = 0;

        this.lastAction = "Waiting";

        this.handResult = null;

    }

    bet(amount) {

        if (
            amount > this.chips
        ) {

            amount =
                this.chips;

            this.allIn =
                true;

        }

        this.chips -=
            amount;

        this.currentBet +=
            amount;

        this.totalContribution +=
            amount;

        return amount;

    }

    fold() {

        this.folded =
            true;

        this.lastAction =
            "Fold";

    }

    call() {

        this.lastAction =
            "Call";

    }

    raise() {

        this.lastAction =
            "Raise";

    }

    check() {

        this.lastAction =
            "Check";

    }

}
