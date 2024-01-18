// all commands
const commands = ["help", "neofetch", "clear", "color", "fungi"];
const commandText = ["help", "neofetch", "fungi"];
const commandFunctions = ["neofetch", "clear", "color"];

let commandHistory = [];
let commandHistoryIndex = 0;

function commandFunction(commandTemp) {
    // dont do anything if input is empty
    if (commandTemp == "") {
        return;
    }

    let command = commandTemp.toLowerCase().split(" ");
    
    // remove old input
    const commandInput = document.getElementsByClassName("command-input")[document.getElementsByClassName("command-input").length - 1];

    if (commandInput) {
        commandInput.children[0].remove();
        commandInput.innerHTML += "<span class='command-input'>" + commandTemp + "</span>";
    }

    const container = document.getElementById("container");
    const result = document.createElement("div");
    result.classList.add("result");    

    // check if command exists and execute it
    if (!commands.includes(command[0])) {
        result.innerHTML += "command \"" + command[0] + "\" not found";
        result.innerHTML += "<br>";
        result.innerHTML += "type \"help\" for a list of commands";
        result.innerHTML += "<br>";
    } else if (commandText.includes(command[0])) {
        const commandHtml = new XMLHttpRequest();
        commandHtml.open("GET", "commands/" + command[0] + ".html", false);
        commandHtml.send();
        result.innerHTML += commandHtml.responseText;
        result.innerHTML += "<br>";
    } else {
        result.innerHTML += "<br>";
    }

    // append result to container
    container.appendChild(result);

    const newTerminal = document.createElement("div");
    newTerminal.classList.add("terminal");
    newTerminal.innerHTML += "<span class='λ'>λ&nbsp;</span>";
    newTerminal.innerHTML += "<div class='command-input'><input type='text' autofocus></div>";

    container.appendChild(newTerminal).focus();

    // scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);

    // execute command
    if (command[0] == "color") {
        color(command);
    } else if (commandFunctions.includes(command[0])) {
        eval(command[0] + "();");
    }

    // add command to history
    commandHistory.unshift(commandTemp);
}

// script for terminal
document.addEventListener("keydown", function(e) {
    const commandInput = document.getElementsByClassName("command-input")[document.getElementsByClassName("command-input").length - 1].children[this.children.length - 1];

    switch (e.key) {
        case "Enter":
            commandFunction(commandInput.value);
            break;
        case "ArrowUp":
            commandInput.value = commandHistory[commandHistoryIndex];

            if (commandHistoryIndex < commandHistory.length - 1) {
                commandHistoryIndex++;
            }
            break;
        case "ArrowDown":
            if (commandHistoryIndex > 0) {
                commandHistoryIndex--;
                commandInput.value = commandHistory[commandHistoryIndex];
            } else {
                commandInput.value = "";
            }
            break;
        case "Backspace":
            break;
            
        default:
            commandInput.focus();
            // move cursor to end of input
            commandInput.setSelectionRange(commandInput.value.length, commandInput.value.length);
            break;
    }

});