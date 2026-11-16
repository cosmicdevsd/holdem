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

    }

}

export function createCardElement(card) {

    const img = document.createElement("img");

    const file =
        `assets/cards/${card.rank}${card.suit}.png`;

    img.src = file;

    img.width = 100;
    img.height = 140;

    img.onerror = () => {

        const fallback =
            document.createElement("div");

        fallback.classList.add("card");

        const red =
            card.suit === "H" ||
            card.suit === "D";

        fallback.classList.add(
            red ? "red" : "black"
        );

        fallback.textContent =
            `${card.rank}${suitSymbol(card.suit)}`;

        img.replaceWith(fallback);

    };

    return img;

}