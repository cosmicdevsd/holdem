import { PokerGame } from "./game.js";
import {
    createCard,
    createBackCard
} from "./ui.js";

import { log } from "./logger.js";

log("main.js loaded");

const game =
    new PokerGame();

game.startHand();

log("Hand started");

const playerSeat =
    document.getElementById(
        "player-seat"
    );

const leftSeat =
    document.getElementById(
        "left-seat"
    );

const topSeat =
    document.getElementById(
        "top-seat"
    );

const rightSeat =
    document.getElementById(
        "right-seat"
    );

const board =
    document.getElementById(
        "community-cards"
    );

const chipTray =
    document.getElementById(
        "chip-tray"
    );

const pot =
    document.getElementById(
        "pot"
    );

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

    if (!seat)
        continue;

    seat.innerHTML = "";

    const name =
        document.createElement(
            "div"
        );

    name.className =
        "player-name";

    name.textContent =
        player.name;

    seat.appendChild(name);

    const hand =
        document.createElement(
            "div"
        );

    hand.className =
        "cards";

    if (
        player.isBot
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

board.innerHTML = "";

for (
    let i = 0;
    i < 5;
    i++
) {

    board.appendChild(
        createBackCard()
    );

}

pot.textContent =
    `POT: $${game.pot}`;

chipTray.innerHTML = "";

for (
    const value
    in game.chips
) {

    const stack =
        document.createElement(
            "div"
        );

    stack.className =
        "chip-stack";

    const chip =
        document.createElement(
            "div"
        );

    chip.className =
        "chip";

    chip.textContent =
        `$${value}`;

    const count =
        document.createElement(
            "div"
        );

    count.textContent =
        `x${game.chips[value]}`;

    chip.addEventListener(
        "click",
        () => {

            if (
                game.chips[value]
                <= 0
            ) {
                return;
            }

            game.chips[value]--;

            game.pot +=
                Number(value);

            count.textContent =
                `x${game.chips[value]}`;

            pot.textContent =
                `POT: $${game.pot}`;

            log(
                `Added $${value} chip to pot`
            );

        }
    );

    stack.appendChild(
        chip
    );

    stack.appendChild(
        count
    );

    chipTray.appendChild(
        stack
    );

}

log("Render complete");
