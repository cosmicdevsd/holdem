export function getAiAction(
    player,
    game
) {

    if (
        player.folded ||
        player.allIn
    ) {

        return "check";

    }

    let strength = 0;

    const card1 =
        player.hand[0];

    const card2 =
        player.hand[1];

    const valueMap = {

        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 11,
        "Q": 12,
        "K": 13,
        "A": 14

    };

    const v1 =
        valueMap[
            card1.rank
        ];

    const v2 =
        valueMap[
            card2.rank
        ];

    const highCard =
        Math.max(
            v1,
            v2
        );

    const pair =
        v1 === v2;

    const suited =
        card1.suit ===
        card2.suit;

    if (pair)
        strength += 40;

    if (suited)
        strength += 10;

    strength +=
        highCard;

    const random =
        new Uint32Array(1);

    crypto.getRandomValues(
        random
    );

    strength +=
        random[0] % 25;

    if (
        game.street ===
        "river"
    ) {

        strength += 10;

    }

    if (
        player.chips <
        100
    ) {

        strength -= 10;

    }

    if (
        strength < 20
    ) {

        return "fold";

    }

    if (
        strength < 55
    ) {

        return "call";

    }

    return "raise";

}

export function getRaiseAmount(
    player,
    game
) {

    const random =
        new Uint32Array(1);

    crypto.getRandomValues(
        random
    );

    const choice =
        random[0] % 3;

    switch (choice) {

        case 0:
            return 10;

        case 1:
            return 20;

        default:
            return 50;

    }

}
