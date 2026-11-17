import { PokerGame } from "./game.js";
import {
    createCard,
    createBackCard
} from "./ui.js";

import { log } from "./logger.js";

const game = new PokerGame();

game.startHand();

announceNewHand();

function announceNewHand() {

    log("");
    log("===== NEW HAND =====");

    log(
        `Dealer: ${
            game.getDealer().name
        }`
    );

    log(
        `Small Blind: ${
            game.getSmallBlindPlayer().name
        } ($5)`
    );

    log(
        `Big Blind: ${
            game.getBigBlindPlayer().name
        } ($10)`
    );

}

function render() {

    renderPlayers();

    renderBoard();

    renderPot();

    renderActions();

}

function renderPlayers() {

    const playerSeat =
        document.getElementById("player-seat");

    const leftSeat =
        document.getElementById("left-seat");

    const topSeat =
        document.getElementById("top-seat");

    const rightSeat =
        document.getElementById("right-seat");

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
            i ===
            game.dealerPosition
        ) {
            label +=
                " (D)";
        }

        if (
            i ===
            game.smallBlindPosition
        ) {
            label +=
                " (SB)";
        }

        if (
            i ===
            game.bigBlindPosition
        ) {
            label +=
                " (BB)";
        }

        name.textContent =
            `${label} - $${player.chips}`;

        seat.appendChild(name);

        const hand =
            document.createElement("div");

        hand.className =
            "cards";

        if (
            player.isBot &&
            game.street !==
                "showdown"
        ) {

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

}

function renderBoard() {

    const board =
        document.getElementById(
            "community-cards"
        );

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

}

function renderPot() {

    const pot =
        document.getElementById(
            "pot"
        );

    pot.innerHTML = `
        <div>
            Pot: $${game.pot}<br>
            ${game.street.toUpperCase()}
        </div>
    `;

}

function renderActions() {

    const chipTray =
        document.getElementById(
            "chip-tray"
        );

    chipTray.innerHTML = "";

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

            game.players[0]
                .folded =
                true;

            log(
                "You fold."
            );

            aiRound();

            nextStreet();

        };

    call.onclick =
        () => {

            game.players[0]
                .chips -=
                game.currentBet;

            game.pot +=
                game.currentBet;

            log(
                `You call $${game.currentBet}`
            );

            aiRound();

            nextStreet();

        };

    raise.onclick =
        () => {

            game.currentBet += 10;

            game.players[0]
                .chips -=
                game.currentBet;

            game.pot +=
                game.currentBet;

            log(
                `You raise to $${game.currentBet}`
            );

            aiRound();

            nextStreet();

        };

    chipTray.appendChild(
        fold
    );

    chipTray.appendChild(
        call
    );

    chipTray.appendChild(
        raise
    );

}

function aiRound() {

    for (
        let i = 1;
        i <
        game.players.length;
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

        render();

        if (
            game.lastWinner
        ) {

            log("");

            log(
                `${game.lastWinner.name} wins!`
            );

            log(
                `Hand: ${
                    game.lastWinner
                        .handResult
                        .name
                }`
            );

            log(
                "Pot awarded."
            );

        }

        setTimeout(
            () => {

                game.nextHand();

                announceNewHand();

                render();

            },
            4000
        );

        return;

    }

    render();

}

render();

log("Game ready.");
