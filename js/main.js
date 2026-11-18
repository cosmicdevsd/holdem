import { PokerGame } from "./game.js";
import { ChipManager } from "./chips.js";

import {
    createCard,
    createBackCard
} from "./ui.js";

import {
    log,
    handBanner
} from "./logger.js";

import {
    getAiAction,
    getRaiseAmount
} from "./ai.js";

const game =
    new PokerGame();

const chips =
    new ChipManager();

let handNumber = 1;

game.startHand();

handBanner(handNumber);

render();

function render() {

    renderPlayers();
    renderBoard();
    renderPot();
    renderBettingArea();

}

function renderPlayers() {

    const seats = [

        document.getElementById(
            "player-seat"
        ),

        document.getElementById(
            "left-seat"
        ),

        document.getElementById(
            "top-seat"
        ),

        document.getElementById(
            "right-seat"
        )

    ];

    for (
        let i = 0;
        i < game.players.length;
        i++
    ) {

        const seat =
            seats[i];

        const player =
            game.players[i];

        seat.innerHTML = "";

        let badges = "";

        if (
            i === game.dealerPosition
        ) {
            badges += " [D]";
        }

        if (
            i === game.smallBlindPosition
        ) {
            badges += " [SB]";
        }

        if (
            i === game.bigBlindPosition
        ) {
            badges += " [BB]";
        }

        const title =
            document.createElement(
                "div"
            );

        title.className =
            "player-name";

        title.innerHTML = `
            <strong>
                ${player.name}
                ${badges}
            </strong>
            <br>
            $${player.chips}
            <br>
            ${player.lastAction}
        `;

        seat.appendChild(
            title
        );

        const hand =
            document.createElement(
                "div"
            );

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

        }

        else {

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

    visible.forEach(
        card => {

            board.appendChild(
                createCard(card)
            );

        }
    );

    while (
        board.children.length < 5
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
            Pot: $${game.pot}
            <br>
            ${game.street.toUpperCase()}
        </div>
    `;

}

function renderBettingArea() {

    const tray =
        document.getElementById(
            "chip-tray"
        );

    tray.innerHTML = "";

    const controls =
        document.createElement(
            "div"
        );

    const call =
        document.createElement(
            "button"
        );

    const raise =
        document.createElement(
            "button"
        );

    const fold =
        document.createElement(
            "button"
        );

    const confirm =
        document.createElement(
            "button"
        );

    call.textContent =
        "Call";

    raise.textContent =
        "Raise";

    fold.textContent =
        "Fold";

    confirm.textContent =
        "Confirm";

    call.onclick =
        () => {

            chips.startCall(
                game.currentBet
            );

            render();

        };

    raise.onclick =
        () => {

            chips.startRaise();

            render();

        };

    fold.onclick =
        () => {

            game.players[0]
                .fold();

            log(
                "You fold."
            );

            finishRound();

        };

    confirm.onclick =
        () => {

            const total =
                chips.getBetTotal();

            if (
                total <= 0
            ) {
                return;
            }

            const paid =
                game.players[0]
                .bet(total);

            game.pot +=
                paid;

            game.players[0]
                .lastAction =
                "Bet";

            log(
                `You bet $${paid}`
            );

            chips.clearBetArea();

            finishRound();

        };

    controls.appendChild(
        call
    );

    controls.appendChild(
        raise
    );

    controls.appendChild(
        fold
    );

    controls.appendChild(
        confirm
    );

    tray.appendChild(
        controls
    );

    const stackRow =
        document.createElement(
            "div"
        );

    stackRow.style.display =
        "flex";

    stackRow.style.justifyContent =
        "center";

    stackRow.style.gap =
        "20px";

    stackRow.style.marginTop =
        "15px";

    for (
        const value
        of chips.values
    ) {

        const stack =
            document.createElement(
                "div"
            );

        stack.style.display =
            "flex";

        stack.style.flexDirection =
            "column";

        stack.style.alignItems =
            "center";

        const chip =
            document.createElement(
                "div"
            );

        chip.className =
            `chip chip-${value}`;

        chip.textContent =
            value;

        chip.onclick =
            () => {

                if (
                    chips.addChip(
                        value
                    )
                ) {

                    render();

                }

            };

        const count =
            document.createElement(
                "div"
            );

        count.style.marginTop =
            "5px";

        count.textContent =
            `x${chips.stacks[value]}`;

        stack.appendChild(
            chip
        );

        stack.appendChild(
            count
        );

        stackRow.appendChild(
            stack
        );

    }

    tray.appendChild(
        stackRow
    );

    const betArea =
        document.createElement(
            "div"
        );

    betArea.className =
        "drop-zone";

    betArea.innerHTML = `
        Current Bet
        <br>
        $${chips.getBetTotal()}
    `;

    tray.appendChild(
        betArea
    );

}

function finishRound() {

    runAi();

    game.advanceStreet();

    if (
        game.street ===
        "showdown"
    ) {

        render();

        showWinner();

        return;

    }

    render();

}

function runAi() {

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
            getAiAction(
                player,
                game
            );

        if (
            action ===
            "fold"
        ) {

            player.fold();

            log(
                `${player.name} folds`
            );

        }

        else if (
            action ===
            "call"
        ) {

            const paid =
                player.bet(
                    game.currentBet
                );

            game.pot +=
                paid;

            player.call();

            log(
                `${player.name} calls`
            );

        }

        else {

            const raiseAmount =
                getRaiseAmount(
                    player,
                    game
                );

            game.currentBet +=
                raiseAmount;

            const paid =
                player.bet(
                    game.currentBet
                );

            game.pot +=
                paid;

            player.raise();

            log(
                `${player.name}
                 raises $${raiseAmount}`
            );

        }

    }

}

function showWinner() {

    const winner =
        game.lastWinner;

    if (!winner) {
        return;
    }

    log(
        `${winner.name}
         wins the hand`
    );

    log(
        `${winner.name}
         shows
         ${winner.handResult.name}`
    );

    setTimeout(
        () => {

            handNumber++;

            game.nextHand();

            handBanner(
                handNumber
            );

            render();

        },
        4000
    );

}
