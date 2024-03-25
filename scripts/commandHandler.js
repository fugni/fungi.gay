// commands that use html
const commandText = ["neofetch"];

let commandHistory = [];
let commandHistoryIndex = 0;

function commandFunction(commandTemp) {
    // split command into array
    let command = commandTemp.toLowerCase().split(" ");
    // remove empty strings from start of array
    while (command[0] == "") {
        command.shift();
    }
    // dont do anything if input is empty
    if (command == "") {
        return;
    }

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
        commandHtml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        commandHtml.send();
        result.innerHTML += commandHtml.responseText;
        result.innerHTML += "<br>";
    }

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
        case "list":
        case "dir":
            ls(command);
            break;
        case "cd":
            cd(command);
            break;
        case "help":
            help(command);
            break;
        // case "movie":
        //     movie(command);
        //     break;

        default:
            // check if command is a file
            if (command[0].endsWith(".txt") || command[0].endsWith(".jpg")) {
                switch (currentDirectoryPath.length) {
                    case 0: // root
                        if (command[0] in fileStructure) {
                            result.innerHTML += fileStructure[command[0]];
                            result.innerHTML += "<br>";
                            break;
                        } else {
                            result.innerHTML += "file not found";
                            result.innerHTML += "<br>";
                            break;
                        }
                    case 1: // 1 directory under root
                        if (command[0] in fileStructure[currentDirectoryPath[0]]) {
                            result.innerHTML += fileStructure[currentDirectoryPath[0]][command[0]];
                            result.innerHTML += "<br>";
                            break;
                        } else {
                            result.innerHTML += "file not found";
                            result.innerHTML += "<br>";
                            break;
                        }
                    case 2: // 2 directories under root
                        if (command[0] in fileStructure[currentDirectoryPath[0]][currentDirectoryPath[1]]) {
                            result.innerHTML += fileStructure[currentDirectoryPath[0]][currentDirectoryPath[1]][command[0]];
                            result.innerHTML += "<br>";
                            break;
                        } else {
                            result.innerHTML += "file not found";
                            result.innerHTML += "<br>";
                            break;
                        }
                }
                break;
            }

            // command not found
            result.innerHTML += 'command "' + command[0] + '" not found';
            result.innerHTML += "<br>";
            result.innerHTML += 'type "help" for a list of commands';
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
document.addEventListener("keydown", function (e) {
    const commandInput = document.getElementsByClassName("command-input")[document.getElementsByClassName("command-input").length - 1].children[this.children.length - 1];

    // if input isnt focused focus on input 
    if (commandInput !== document.activeElement || commandInput.value == "") {
        commandInput.focus();
    } else {
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
    
            // focus input for all other keys
            default:
                commandInput.focus();
                // move cursor to end of input
                commandInput.setSelectionRange(commandInput.value.length, commandInput.value.length);
                break;
        }
    }
});

// function to add new terminal
function newTerminal() {
    const newTerminal = document.createElement("div");
    newTerminal.classList.add("terminal");
    newTerminal.innerHTML += "<span class='λ'>λ" + currentDirectoryString + "&nbsp;</span>";
    newTerminal.innerHTML += "<div class='command-input'><input type='text' autofocus></div>";
    // container should exist when this function is called
    container.appendChild(newTerminal).focus();
}