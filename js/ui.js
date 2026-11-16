function suitSymbol(suit) {

    switch (suit) {

        case "H":
            return "♥";

        case "D":
            return "♦";

        case "C":
            return "♣";

        case "S":
            return "♠";

        default:
            return "?";
    }

}

export function createCard(card) {

    const div =
        document.createElement("div");

    div.className = "card";

    const red =
        card.suit === "H" ||
        card.suit === "D";

    div.classList.add(
        red ? "red" : "black"
    );

    div.textContent =
        card.rank +
        suitSymbol(card.suit);

    return div;
}
