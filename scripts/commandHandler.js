// // all commands
// const commands = ["clear", "color", "fungi", "help", "neofetch", "ls", "cd"];
// commands that use html
const commandText = ["fungi", "help", "neofetch"];

let commandHistory = [];
let commandHistoryIndex = 0;

function commandFunction(commandTemp) {
    // dont do anything if input is empty
    if (commandTemp == "") {
        return;
    }

    // split input into command and arguments
    let command = commandTemp.toLowerCase().split(" ");
    
    // replace old input with span element
    const commandInput = document.getElementsByClassName("command-input")[document.getElementsByClassName("command-input").length - 1];

    if (commandInput) {
        commandInput.children[0].remove();
        commandInput.innerHTML += "<span class='command-input'>" + commandTemp + "</span>";
    }

    const container = document.getElementById("container");
    const result = document.createElement("div");
    result.classList.add("result");    

    if (commandText.includes(command[0])) {
        const commandHtml = new XMLHttpRequest();
        commandHtml.open("GET", "commands/" + command[0] + ".html", false);
        commandHtml.send();
        result.innerHTML += commandHtml.responseText;
        result.innerHTML += "<br>";
    } 
    console.log(command[0]);

    // append result to container and add new terminal
    container.appendChild(result);

    // execute command and pass arguments
    switch (command[0]) {
        case "clear":
        case "cls":
            clear(command);
            break;
        case "color":
            color(command);
            break;
        case "neofetch":
            neofetch(command);
            break;
        case "ls":
            ls(command);
            break;
        case "cd":
            cd(command);
            break;

        // commands that use html
        case "help":
        case "fungi":
            break;

        // command not found
        default:
            result.innerHTML += "command \"" + command[0] + "\" not found";
            result.innerHTML += "<br>";
            result.innerHTML += "type \"help\" for a list of commands";
            result.innerHTML += "<br>";
            break;
    }    

    newTerminal();

    // scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);


    // add command to history
    commandHistory.unshift(commandTemp);
}

// script for terminal
document.addEventListener("keydown", function(e) {
    const commandInput = document.getElementsByClassName("command-input")[document.getElementsByClassName("command-input").length - 1].children[this.children.length - 1];

    switch (e.key) {
        // execute command on enter
        case "Enter":
            commandFunction(commandInput.value);
            break;

        // cycle through command history
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
        
        // dont do anything for these keys
        case "ArrowLeft":
        case "ArrowRight":
        case "Backspace":
            break;
        
        // focus input for all other keys
        default:
            commandInput.focus();
            // move cursor to end of input
            commandInput.setSelectionRange(commandInput.value.length, commandInput.value.length);
            break;
    }
});

// function to add new terminal
function newTerminal() {
    const newTerminal = document.createElement("div");
    newTerminal.classList.add("terminal");
    newTerminal.innerHTML += "<span class='λ'>λ" + currentDirectory + "&nbsp;</span>";
    newTerminal.innerHTML += "<div class='command-input'><input type='text' autofocus></div>";
    // container should exist when this function is called
    container.appendChild(newTerminal).focus();
}