// all commands
const commands = ["neofetch"];

function command(command) {
    if (command == "") {
        return;
    }
    
    const oldCommandInput = document.getElementById("command-input");

    const oldCommandInputReplace = document.createElement("span");
    oldCommandInputReplace.innerHTML = command;

    if (oldCommandInput) {
        oldCommandInput.replaceChild(oldCommandInputReplace, oldCommandInput.children[0]);
    }

    const result = document.createElement("div");
    result.classList.add("result");

    if (!commands.includes(command)) {
        document.write("\"" + command + "\" not found");
        document.write("<br>");
        document.write("type \"help\" for a list of commands");
        document.write("<br><br>");
    } else {
        const commandHtml = new XMLHttpRequest();
        commandHtml.open("GET", "includes/" + command + ".html", false);
        commandHtml.send();
        document.write(commandHtml.responseText);
        document.write("<br>")
    }
    
    document.write("<div class='terminal'>");
    document.write("<span class='λ'>λ&nbsp;</span>");
    document.write("<div id='command-input'><input type='text' autofocus></div>");
    document.write("</div>");

}

document.addEventListener("keydown", function(e) {
    const commandInput = document.getElementById("command-input");
    if (e.key == "Enter") {
        command(commandInput.children[0].value);
    }
});

function neofetch() {
    const ageDiv = document.getElementsByClassName('age')[document.getElementsByClassName('age').length - 1];
    age = Date.now() - new Date(2005, 10, 15);
    age = Math.floor(age / 1000 / 60 / 60 / 24 / 365);
    ageDiv.innerText = age + " years old";

    const neofetchArt = document.getElementsByClassName('neofetch-art')[0];

    fetch("ascii.txt")
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

