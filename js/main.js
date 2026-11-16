import { PokerGame } from "./game.js";
import { createCard } from "./ui.js";
import { log } from "./logger.js";

log("main.js loaded");

const game = new PokerGame();

log("PokerGame created");

game.startHand();

log("Hand started");

const seatElements = {
    player: document.getElementById("player-seat"),
    left: document.getElementById("left-seat"),
    top: document.getElementById("top-seat"),
    right: document.getElementById("right-seat")
};

for (const key in seatElements) {

    if (!seatElements[key]) {

        log(`Missing HTML element: ${key}`);
        console.error(`Missing HTML element: ${key}`);
        return;

    }

}

const seatOrder = [
    "player",
    "left",
    "top",
    "right"
];

for (let i = 0; i < game.players.length; i++) {

    const player = game.players[i];

    const seat =
        seatElements[
            seatOrder[i]
        ];

    seat.innerHTML = "";

    const name =
        document.createElement("div");

    name.className = "player-name";
    name.textContent = player.name;

    seat.appendChild(name);

    const cards =
        document.createElement("div");

    cards.className = "cards";

    if (player.isBot) {

        cards.innerHTML =
            "<div class='card'>🂠</div>" +
            "<div class='card'>🂠</div>";

    } else {

        for (const card of player.hand) {

            cards.appendChild(
                createCard(card)
            );

        }

    }

    seat.appendChild(cards);

}

const board =
    document.getElementById(
        "community-cards"
    );

if (!board) {

    log("community-cards element missing");
    console.error("community-cards element missing");

} else {

    board.innerHTML = "";

    for (const card of game.communityCards) {

        board.appendChild(
            createCard(card)
        );

    }

}

const pot =
    document.getElementById(
        "pot"
    );

if (pot) {

    pot.textContent =
        `Pot: $${game.pot}`;

}

log("Render complete");
