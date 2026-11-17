const MAX_LOG_LINES = 250;

export function log(message) {

    console.log(
        `[Poker] ${message}`
    );

    const logBox =
        document.getElementById(
            "log"
        );

    if (!logBox) {
        return;
    }

    const line =
        document.createElement(
            "div"
        );

    const now =
        new Date();

    const timestamp =
        now.toLocaleTimeString();

    line.textContent =
        `[${timestamp}] ${message}`;

    logBox.prepend(line);

    while (
        logBox.children.length >
        MAX_LOG_LINES
    ) {

        logBox.removeChild(
            logBox.lastChild
        );

    }

}

export function separator() {

    log(
        "------------------------------------------"
    );

}

export function handBanner(number) {

    separator();

    log(
        `HAND ${number}`
    );

    separator();

}
