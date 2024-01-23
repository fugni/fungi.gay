const neofetchArtColors = ["#dc3343", "#ca2931", "#d73f5b", "#e3d2c7", "#d8bfb5", "#000000"];
const neofetchArtArray = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,3,3,3,5,5,5,3,0,0,0,0,0,0],
    [0,0,0,0,0,3,5,5,5,2,2,2,5,3,0,0,0,0,0],
    [0,0,0,0,3,5,1,0,0,5,0,3,2,5,3,0,0,0,0],
    [0,0,0,0,3,5,1,3,0,0,0,0,2,5,3,0,0,0,0],
    [0,0,0,3,5,1,5,0,0,5,0,0,3,5,3,0,0,0,0],
    [0,0,0,3,5,1,1,1,5,5,0,5,5,3,0,0,0,0,0],
    [0,0,0,3,5,1,3,1,3,1,5,4,5,3,0,0,0,0,0],
    [0,0,0,0,3,5,1,1,1,5,4,3,3,5,3,0,0,0,0],
    [0,0,0,0,0,3,5,5,5,3,5,4,4,3,5,3,0,0,0],
    [0,0,0,0,0,0,3,3,3,0,3,5,3,4,5,3,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,3,5,4,5,3,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,3,5,3,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// script for neofetch
function neofetch() {
    // age calculation
    const ageDiv = document.getElementsByClassName('age')[document.getElementsByClassName('age').length - 1];
    age = Date.now() - new Date(2005, 10, 15);
    age = Math.floor(age / 1000 / 60 / 60 / 24 / 365);
    ageDiv.innerText = age + " years old";
    // append birthday message if it's my birthday
    if (new Date().getMonth() == 9 && new Date().getDate() == 15) {
        ageDiv.innerText += " (happy birthday to me)";
    }

    // neofetch art
    // elephant art is hidden unless clicked on elephant emoji
    const neofetchArt = document.getElementsByClassName('neofetch-art')[document.getElementsByClassName('neofetch-art').length - 1];
    const elephantArt = document.getElementsByClassName('elephant-art')[document.getElementsByClassName('elephant-art').length - 1];
    elephantArt.style.display = "none";

    // append neofetch art from array
    for (let i = 0; i < neofetchArtArray.length; i++) {
        for (let j = 0; j < neofetchArtArray[i].length; j++) {
            let color = neofetchArtColors[neofetchArtArray[i][j]];
            let span = document.createElement("span");
            span.style.color = color;
            span.innerText = "██";
            neofetchArt.appendChild(span);
        }
        if (i != neofetchArtArray.length - 1) {
            neofetchArt.appendChild(document.createElement("br"));
        }
    }

    // fetch elephant ascii art from .txt file
    fetch("assets/elephant.txt")
        .then((res) => res.text())
        .then((text) => {
            const lines = text.split('\n');
            for (let i = 0; i < 20; i++) {
                const elephantArtRow = document.createTextNode(lines[i] + '\n');
                elephantArt.appendChild(elephantArtRow);
            }
        })
        .catch((e) => console.error(e));

    // elephant emoji click handler
    const elephant = document.getElementsByClassName('elephant')[document.getElementsByClassName('elephant').length - 1];
    elephant.addEventListener("click", function() {
        if (elephantArt.style.display == "none") {
            elephantArt.style.display = "block";
            neofetchArt.style.display = "none";
        } else {
            elephantArt.style.display = "none";
            neofetchArt.style.display = "block";
        }
    });
};

// script for clear command 
function clear() {
    // clear container
    const container = document.getElementById("container");
    console.log(container);
    container.innerHTML = "";

    // add new terminal
    newTerminal();
}

// script for color command
const colors = {purple: "#ca99ff", blue: "#2196f3", green: "#4caf50", yellow: "#ffeb3b", orange: "#ff9800", red: "#f44336", white: "#ffffff", black: "#000000"}
function color(color) {
    const result = document.getElementById("container").children[document.getElementById("container").children.length - 2];

    // if no color specified, list colors
    if (!color[1]) {
        result.innerText += "color: pick a color from the list below, or use a hex code";
        result.innerHTML += "<br>";
        result.innerHTML += "<span style=\"color: #ca99ff\">purple</span>, <span style=\"color: #2196f3\">blue</span>, <span style=\"color: #4caf50\">green</span>, <span style=\"color: #ffeb3b\">yellow</span>, <span style=\"color: #ff9800\">orange</span>, <span style=\"color: #f44336\">red</span>, <span style=\"color: #ffffff\">white</span>, <span style=\"color: #000000; background-color: #ffffff; padding: 0 3px;\">black</span>";
    // if color is in list, change color
    } else if (colors[color[1]]) { 
        document.documentElement.style.cssText = "--accent-text-color1: " + colors[color[1]];
        result.innerHTML += "color changed to <span style=color:" + colors[color[1]] + ";>" + color[1] + "</span>";
        if (color[1] == "black") {
            result.innerHTML += "<br>good look reading hehe<br>";
        }
    // if color is hex code, change color
    } else if (/^#[0-9A-F]{6}$/i.test(color[1])) {
        document.documentElement.style.cssText = "--accent-text-color1: " + color[1];
        result.innerHTML += "color changed to <span style=color:" + color[1] + ";>" + color[1] + "</span>";
    // if color isn't in list, or a hex code, display error message
    } else {
        result.innerHTML += "color: \"" + color[1] + "\" not found";
        result.innerHTML += "<br>";
        result.innerHTML += "type \"color\" for a list of colors";
        result.innerHTML += "<br>";
    }

    resultContainer.appendChild(result);
}