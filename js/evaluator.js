evaluateHand(cardsexport function evaluateHand(cards) {

    const rankCounts = {};
    const suitCounts = {};

    const values = [];

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

    for (const card of cards) {

        const value =
            valueMap[
                card.rank
            ];

        values.push(value);

        rankCounts[
            value
        ] =
        (
            rankCounts[value] || 0
        ) + 1;

        suitCounts[
            card.suit
        ] =
        (
            suitCounts[
                card.suit
            ] || 0
        ) + 1;

    }

    values.sort(
        (a, b) => a - b
    );

    const counts =
        Object.values(
            rankCounts
        );

    const flush =
        Object.values(
            suitCounts
        ).some(
            count => count >= 5
        );

    let straight =
        false;

    const unique =
        [
            ...new Set(values)
        ];

    for (
        let i = 0;
        i <= unique.length - 5;
        i++
    ) {

        if (
            unique[i + 4] -
            unique[i] === 4
        ) {

            straight = true;

        }

    }

    if (
        unique.includes(14)
    ) {

        const lowAce =
            [
                1,
                ...unique
            ];

        for (
            let i = 0;
            i <= lowAce.length - 5;
            i++
        ) {

            if (
                lowAce[i + 4] -
                lowAce[i] === 4
            ) {

                straight = true;

            }

        }

    }

    const fourKind =
        counts.includes(4);

    const threeKind =
        counts.includes(3);

    const pairs =
        counts.filter(
            c => c === 2
        ).length;

    const fullHouse =
        threeKind &&
        (
            pairs > 0 ||
            counts.filter(
                c => c === 3
            ).length > 1
        );

    if (
        straight &&
        flush &&
        Math.max(
            ...values
        ) === 14
    ) {

        return {
            rank: 10,
            name: "Royal Flush"
        };

    }

    if (
        straight &&
        flush
    ) {

        return {
            rank: 9,
            name: "Straight Flush"
        };

    }

    if (
        fourKind
    ) {

        return {
            rank: 8,
            name: "Four of a Kind"
        };

    }

    if (
        fullHouse
    ) {

        return {
            rank: 7,
            name: "Full House"
        };

    }

    if (
        flush
    ) {

        return {
            rank: 6,
            name: "Flush"
        };

    }

    if (
        straight
    ) {

        return {
            rank: 5,
            name: "Straight"
        };

    }

    if (
        threeKind
    ) {

        return {
            rank: 4,
            name: "Three of a Kind"
        };

    }

    if (
        pairs >= 2
    ) {

        return {
            rank: 3,
            name: "Two Pair"
        };

    }

    if (
        pairs === 1
    ) {

        return {
            rank: 2,
            name: "One Pair"
        };

    }

    return {
        rank: 1,
        name: "High Card"
    };

}

export function determineWinner(players, communityCards) {

    let winners = [];

    let bestRank = -1;

    for (const player of players) {

        if (
            player.folded
        ) {
            continue;
        }

        const result =
            evaluateHand([
                ...player.hand,
                ...communityCards
            ]);

        player.handResult =
            result;

        if (
            result.rank >
            bestRank
        ) {

            winners =
                [player];

            bestRank =
                result.rank;

        }

        else if (
            result.rank ===
            bestRank
        ) {

            winners.push(
                player
            );

        }

    }

    if (
        winners.length === 1
    ) {

        return winners[0];

    }

    const random =
        new Uint32Array(1);

    crypto.getRandomValues(
        random
    );

    return winners[
        random[0] %
        winners.length
    ];

}
