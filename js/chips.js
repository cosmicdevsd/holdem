export class ChipManager {

    constructor() {

        this.values = [
            5,
            10,
            20,
            50,
            100
        ];

        this.stacks = {

            5: 20,
            10: 20,
            20: 20,
            50: 20,
            100: 20

        };

        this.betArea = [];

        this.mode = "locked";

        this.targetAmount = 0;

    }

    lock() {

        this.mode =
            "locked";

        this.targetAmount =
            0;

    }

    startCall(amount) {

        this.mode =
            "call";

        this.targetAmount =
            amount;

        this.betArea = [];

    }

    startRaise() {

        this.mode =
            "raise";

        this.targetAmount =
            0;

        this.betArea = [];

    }

    canTakeChip(value) {

        if (
            this.stacks[value] <= 0
        ) {

            return false;

        }

        if (
            this.mode ===
            "locked"
        ) {

            return false;

        }

        if (
            this.mode ===
            "raise"
        ) {

            return true;

        }

        const future =
            this.getBetTotal() +
            value;

        return (
            future <=
            this.targetAmount
        );

    }

    addChip(value) {

        if (
            !this.canTakeChip(
                value
            )
        ) {

            return false;

        }

        this.stacks[value]--;

        this.betArea.push(
            value
        );

        return true;

    }

    removeChip(index) {

        if (
            index < 0 ||
            index >=
            this.betArea.length
        ) {

            return false;

        }

        const value =
            this.betArea[index];

        this.betArea.splice(
            index,
            1
        );

        this.stacks[value]++;

        return true;

    }

    getBetTotal() {

        let total = 0;

        for (
            const chip
            of this.betArea
        ) {

            total += chip;

        }

        return total;

    }

    isCallSatisfied() {

        if (
            this.mode !==
            "call"
        ) {

            return false;

        }

        return (
            this.getBetTotal() ===
            this.targetAmount
        );

    }

    clearBetArea() {

        this.betArea = [];

    }

}
