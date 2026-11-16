export function log(message) {
    console.log(`[Poker] ${message}`);

    const logArea =
        document.getElementById("log");

    if (!logArea) return;

    const entry =
        document.createElement("div");

    entry.textContent = message;

    logArea.prepend(entry);
}