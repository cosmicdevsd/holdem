export function animateChipToPot(
    sourceElement
) {

    const pot =
        document.getElementById(
            "pot"
        );

    if (
        !sourceElement ||
        !pot
    ) {

        return Promise.resolve();

    }

    const sourceRect =
        sourceElement
        .getBoundingClientRect();

    const potRect =
        pot
        .getBoundingClientRect();

    const chip =
        document.createElement(
            "div"
        );

    chip.className =
        "flying-chip";

    chip.style.left =
        `${sourceRect.left}px`;

    chip.style.top =
        `${sourceRect.top}px`;

    document.body.appendChild(
        chip
    );

    requestAnimationFrame(
        () => {

            chip.style.left =
                `${potRect.left}px`;

            chip.style.top =
                `${potRect.top}px`;

        }
    );

    return new Promise(
        resolve => {

            setTimeout(
                () => {

                    chip.remove();

                    resolve();

                },
                500
            );

        }
    );

}
