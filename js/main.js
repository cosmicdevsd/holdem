import { PokerGame } from "./game.js";
import { createCard } from "./ui.js";
import { log } from "./logger.js";

const game =
    new PokerGame();

game.startHand();

log("New hand started.");

const seats = {

    top:
    document.getElementById(
        "top-seat"
    ),

    left:
    document.getElementById(
        "left-seat"
    ),

    right:
    document.getElementById(
        "right-seat"
    ),

    player:
    document.getElementById(
        "player-seat"
    )
};

const seatOrder = [
    "player",
    "left",
    "top",
    "right"
];

for (let i = 0; i < 4; i++) {

    const player =
        game.players[i];

    const container =
        seats[
            seatOrder[i]
        ];

    const name =
        document.createElement("div");

    name.className =
        "player-name";

    name.textContent =
        player.name;

    container.appendChild(name);

    const cards =
        document.createElement("div");

    cards.className =
        "cards";

    if (player.isBot) {

        cards.innerHTML =
            "<div class='card'>🂠</div>" +
            "<div class='card'>🂠</div>";

    } else {

        player.hand.forEach(card => {

            cards.appendChild(
                createCard(card)
            );

        });

    }

    container.appendChild(cards);
}

const board =
document.getElementById(
    "community-cards"
);

game.communityCards.forEach(card => {

    board.appendChild(
        createCard(card)
    );

});
