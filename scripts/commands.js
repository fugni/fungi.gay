// script for neofetch
function neofetch() {
    const ageDiv = document.getElementsByClassName('age')[document.getElementsByClassName('age').length - 1];
    age = Date.now() - new Date(2005, 10, 15);
    age = Math.floor(age / 1000 / 60 / 60 / 24 / 365);
    ageDiv.innerText = age + " years old";

    const flags = ["uk", "usa", "canada"];

    const flagDiv = document.getElementsByClassName('english-flag')[document.getElementsByClassName('english-flag').length - 1];
    flagDiv.src = "assets/flags/" + flags[Math.floor(Math.random() * flags.length)] + ".svg";

    const neofetchArt = document.getElementsByClassName('neofetch-art')[document.getElementsByClassName('neofetch-art').length - 1];

    fetch("assets/ascii.txt")
        .then((res) => res.text())
        .then((text) => {
            const lines = text.split('\n');
            for (let i = 0; i < 21; i++) {
                const neofetchArtRow = document.createTextNode(lines[i] + '\n');
                neofetchArt.appendChild(neofetchArtRow);
            }
        })
        .catch((e) => console.error(e));
}

// script for clear command 
function clear() {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const newTerminal = document.createElement("div");
    newTerminal.classList.add("terminal", "first");
    newTerminal.innerHTML += "<span class='λ'>λ&nbsp;</span>";
    newTerminal.innerHTML += "<div class='command-input'><input type='text' autofocus></div>";

    container.appendChild(newTerminal).focus();
}


// commands without scripts
function help() {

}

function fungi() {

}

function wip() {

}