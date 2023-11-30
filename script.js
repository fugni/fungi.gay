// age
const ageDiv = document.getElementsByClassName('age')[0];
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