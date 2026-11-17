import { PokerGame } from "./game.js";
import {
    createCard,
    createBackCard
} from "./ui.js";

import { log } from "./logger.js";

const game = new PokerGame();

game.startHand();

function render() {

    const playerSeat =
        document.getElementById("player-seat");

    const leftSeat =
        document.getElementById("left-seat");

    const topSeat =
        document.getElementById("top-seat");

    const rightSeat =
        document.getElementById("right-seat");

    const board =
        document.getElementById("community-cards");

    const chipTray =
        document.getElementById("chip-tray");

    const pot =
        document.getElementById("pot");

    const seats = [
        playerSeat,
        leftSeat,
        topSeat,
        rightSeat
    ];

    for (
        let i = 0;
        i < game.players.length;
        i++
    ) {

        const player =
            game.players[i];

        const seat =
            seats[i];

        seat.innerHTML = "";

        const name =
            document.createElement("div");

        name.className =
            "player-name";

        let label =
            player.name;

        if (
            i === game.dealerPosition
        ) {
            label += " (D)";
        }

        if (
            i === game.smallBlindPosition
        ) {
            label += " (SB)";
        }

        if (
            i === game.bigBlindPosition
        ) {
            label += " (BB)";
        }

        name.textContent =
            `${label} - $${player.chips}`;

        seat.appendChild(name);

        const hand =
            document.createElement("div");

        hand.className =
            "cards";

        if (player.isBot) {

            hand.appendChild(
                createBackCard()
            );

            hand.appendChild(
                createBackCard()
            );

        } else {

            for (
                const card
                of player.hand
            ) {

                hand.appendChild(
                    createCard(card)
                );

            }

        }

        seat.appendChild(
            hand
        );

    }

    pot.innerHTML = `
        <div>
            POT: $${game.pot}<br>
            STREET:
            ${game.street.toUpperCase()}
        </div>
    `;

    board.innerHTML = "";

    const visible =
        game.getVisibleCommunityCards();

    for (
        let i = 0;
        i < visible.length;
        i++
    ) {

        board.appendChild(
            createCard(
                visible[i]
            )
        );

    }

    for (
        let i = visible.length;
        i < 5;
        i++
    ) {

        board.appendChild(
            createBackCard()
        );

    }

    chipTray.innerHTML = "";

    createActionButtons(
        chipTray
    );

}

function createActionButtons(
    container
) {

    const fold =
        document.createElement(
            "button"
        );

    const call =
        document.createElement(
            "button"
        );

    const raise =
        document.createElement(
            "button"
        );

    fold.textContent =
        "Fold";

    call.textContent =
        "Call";

    raise.textContent =
        "Raise";

    fold.onclick =
        () => {

            log(
                "You folded."
            );

            nextStreet();

        };

    call.onclick =
        () => {

            game.players[0].chips -=
                game.currentBet;

            game.pot +=
                game.currentBet;

            log(
                `You called $${game.currentBet}`
            );

            aiRound();

            nextStreet();

        };

    raise.onclick =
        () => {

            game.currentBet +=
                10;

            game.players[0].chips -=
                game.currentBet;

            game.pot +=
                game.currentBet;

            log(
                `You raised to $${game.currentBet}`
            );

            aiRound();

            nextStreet();

        };

    container.appendChild(
        fold
    );

    container.appendChild(
        call
    );

    container.appendChild(
        raise
    );

}

function aiRound() {

    for (
        let i = 1;
        i < game.players.length;
        i++
    ) {

        const player =
            game.players[i];

        if (
            player.folded
        ) {
            continue;
        }

        const action =
            game.aiDecision();

        if (
            action === "fold"
        ) {

            player.folded =
                true;

            log(
                `${player.name} folds`
            );

        }

        else if (
            action === "call"
        ) {

            player.chips -=
                game.currentBet;

            game.pot +=
                game.currentBet;

            log(
                `${player.name} calls`
            );

        }

        else {

            game.currentBet +=
                10;

            player.chips -=
                game.currentBet;

            game.pot +=
                game.currentBet;

            log(
                `${player.name} raises`
            );

        }

    }

}

function nextStreet() {

    game.advanceStreet();

    if (
        game.street ===
        "showdown"
    ) {

        log(
            "Showdown."
        );

        render();

        setTimeout(
            () => {

                log(
                    "New hand."
                );

                game.nextHand();

                render();

            },
            3000
        );

        return;

    }

    render();

}

render();

log("Game started.");
