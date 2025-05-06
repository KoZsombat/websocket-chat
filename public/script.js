const socket = io();

document.getElementById("msg").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const msgInput = document.getElementById("msg");
    const nameInput = document.getElementById("name");
    const chatBox = document.getElementById("chatBox");

    const name = nameInput.value.trim();
    const message = msgInput.value.trim();

    msgInput.style.backgroundColor = "white";
    nameInput.style.backgroundColor = "white";

    if (name !== "" && message !== "") {
        socket.emit('msgtoserver', name, message);
    } else {
        if (name === "") nameInput.style.backgroundColor = "rgb(255,0,0,0.1)";
        if (message === "") msgInput.style.backgroundColor = "rgb(255,0,0,0.1)";
    }
}

socket.on('msgtoclient', (name, msg) => {
    const chatBox = document.getElementById("chat");
    const msgInput = document.getElementById("msg");

    const messageElement = document.createElement("p");
    messageElement.textContent = `${name || "Anonymous"}: ${msg}`;
    chatBox.appendChild(messageElement);
    msgInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
});