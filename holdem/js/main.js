import { PokerGame } from "./game.js";
import { createCardElement } from "./ui.js";
import { log } from "./logger.js";

log("main.js loaded");

const game = new PokerGame();

log("PokerGame created");

game.startHand();

log("Hand started");

const playerArea =
    document.getElementById(
        "player-area"
    );

log("Rendering player cards");

for (const card of game.players[0].hand) {

    playerArea.appendChild(
        createCardElement(card)
    );

    log(
        `Rendered ${card.rank}${card.suit}`
    );
}