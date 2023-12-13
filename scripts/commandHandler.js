// all commands
const commands = ["help", "neofetch", "clear", "fungi", "wip"];

let commandHistory = [];
let commandHistoryIndex = 0;

function command(command) {
    // dont do anything if input is empty
    if (command == "") {
        return;
    }
    
    // remove old input
    const commandInput = document.getElementsByClassName("command-input")[document.getElementsByClassName("command-input").length - 1];

    if (commandInput) {
        commandInput.children[0].remove();
        commandInput.innerHTML += "<span class='command-input'>" + command + "</span>";
    }

    const container = document.getElementById("container");
    const result = document.createElement("div");
    result.classList.add("result");    

    // check if command exists and execute it
    if (!commands.includes(command.toLowerCase())) {
        result.innerHTML += "command \"" + command + "\" not found";
        result.innerHTML += "<br>";
        result.innerHTML += "type \"help\" for a list of commands";
        result.innerHTML += "<br>";
    } else {
        const commandHtml = new XMLHttpRequest();
        commandHtml.open("GET", "commands/" + command + ".html", false);
        commandHtml.send();
        result.innerHTML += commandHtml.responseText;
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
    if (commands.includes(command)) {
        eval(command + "();");
    }

    // add command to history
    commandHistory.unshift(command);
}

// script for terminal
document.addEventListener("keydown", function(e) {
    const commandInput = document.getElementsByClassName("command-input")[document.getElementsByClassName("command-input").length - 1];
    
    // focus on input
    commandInput.children[commandInput.children.length - 1].focus();
    // move cursor to end of input
    commandInput.children[commandInput.children.length - 1].setSelectionRange(commandInput.children[commandInput.children.length - 1].value.length, commandInput.children[commandInput.children.length - 1].value.length);


    if (e.key == "Enter") {
        command(commandInput.children[commandInput.children.length - 1].value);
    }

    // command history
    if (e.key == "ArrowUp") {
        commandInput.children[commandInput.children.length - 1].value = commandHistory[commandHistoryIndex];

        if (commandHistoryIndex < commandHistory.length - 1) {
            commandHistoryIndex++;
        }
    }
    if (e.key == "ArrowDown") {
        if (commandHistoryIndex > 0) {
            commandHistoryIndex--;
            commandInput.children[commandInput.children.length - 1].value = commandHistory[commandHistoryIndex];
        } else {
            commandInput.children[commandInput.children.length - 1].value = "";
        }
    }

});