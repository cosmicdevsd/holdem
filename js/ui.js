function getSuitSymbol(suit) {

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

    div.className =
        "card";

    div.textContent =
        card.rank +
        getSuitSymbol(card.suit);

    if (
        card.suit === "H" ||
        card.suit === "D"
    ) {
        div.style.color = "red";
    }

    return div;
}

export function createBackCard() {

    const div =
        document.createElement("div");

    div.className =
        "card";

    div.style.background =
        "#223";

    div.style.color =
        "white";

    div.textContent =
        "🂠";

    return div;
}
