import { PokerGame } from "./game.js";
import { createCard } from "./ui.js";
import { log } from "./logger.js";

log("main.js loaded");

const game = new PokerGame();

log("PokerGame created");

game.startHand();

log("Hand started");

const playerSeat = document.getElementById("player-seat");
const leftSeat = document.getElementById("left-seat");
const topSeat = document.getElementById("top-seat");
const rightSeat = document.getElementById("right-seat");
const board = document.getElementById("community-cards");

if (!playerSeat) console.error("Missing player-seat");
if (!leftSeat) console.error("Missing left-seat");
if (!topSeat) console.error("Missing top-seat");
if (!rightSeat) console.error("Missing right-seat");
if (!board) console.error("Missing community-cards");

const seats = [
    playerSeat,
    leftSeat,
    topSeat,
    rightSeat
];

for (let i = 0; i < game.players.length; i++) {

    const player = game.players[i];
    const seat = seats[i];

    if (!seat) {
        continue;
    }

    seat.innerHTML = "";

    const name = document.createElement("div");

    name.className = "player-name";
    name.textContent = player.name;

    seat.appendChild(name);

    const cardArea = document.createElement("div");

    cardArea.className = "cards";

    if (player.isBot) {

        cardArea.innerHTML = `
            <div class="card">🂠</div>
            <div class="card">🂠</div>
        `;

    } else {

        for (const card of player.hand) {

            cardArea.appendChild(
                createCard(card)
            );

        }

    }

    seat.appendChild(cardArea);

}

if (board) {

    board.innerHTML = "";

    for (const card of game.communityCards) {

        board.appendChild(
            createCard(card)
        );

    }

}

const pot = document.getElementById("pot");

if (pot) {

    pot.textContent = `Pot: $${game.pot}`;

}

log("Render complete");
