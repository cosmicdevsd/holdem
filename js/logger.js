export function log(message) {

    console.log(message);

    const logBox =
        document.getElementById("log");

    const div =
        document.createElement("div");

    div.textContent = message;

    logBox.prepend(div);
}
