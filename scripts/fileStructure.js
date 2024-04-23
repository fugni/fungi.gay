const fileStructure = {
    "documents": {
        "meow": {
            "meow.txt": "meow meow meow",
            "kitty.jpg": "<img src='assets/img/kitty.jpg' alt='cat in a mushroom costume' height='400px'>"
        },
        "about-me.txt": "hi im sylvie! i like programming, i dont like writing.",
},  "projects": {
        "fungi.gay.txt": "<a href=\"https://fungi.gay\" target=\"_blank\" class=\"link\">https://<span>fungi.gay</span></a>" +
                            "<div class=\"project\">" +
                                "<div class=\"project-side\">" +
                                    "<a href=\"https://fungi.gay\" target=\"_blank\">" +
                                        "<img src=\"/assets/img/projects/fungi.gay.png\" alt=\"picture of neofetch ascii\">" + 
                                    "</a>" +
                                "</div>" +
                                "<span>This is my portfolio, it's made entirely in vanilla JavaScript (and HTML & CSS). I made a command handler that runs every time you enter a command into the terminal, which checks what you entered, and then runs the corresponding command's script. If I were to work more on this project, I would add a backend using either PHP, or Node.js. I also need to work on making it more responsive.<br>" +
                                "<a href=\"https://github.com/fugni/fungi.gay\" target=\"_blank\">github</a></span>" +
                            "</div>",
        "raycaster.txt": "<a href=\"https://raycaster.fungi.gay\" target=\"_blank\" class=\"link\">https://<span>raycaster</span>.fungi.gay</a>" +
                        "<div class=\"project\">" +
                            "<div class=\"project-side\">" +
                                "<a href=\"https://raycaster.fungi.gay\" target=\"_blank\">" +
                                    "<img src=\"/assets/img/projects/raycaster.png\" alt=\"picture of raycaster\">" + 
                                "</a>" +
                            "</div>" +
                            "<span>A simple raycaster I made in vanilla JavaScript. <br>" +
                            "<a href=\"https://github.com/fugni/raycaster\" target=\"_blank\">github</a></span>" +
                        "</div>",
        "timestamp.txt": "<a href=\"https://timestamp.fungi.gay\" target=\"_blank\" class=\"link\">https://<span>timestamp</span>.fungi.gay</a><span class=\"timestampgi\">0</span>" +
                        "<div class=\"project\">" +
                            "<span>One day I decided to make my own timestamp. All it is is the unix timestamp minus a specific number (1707992306). This little project did teach me more about github pages, including how to use a custom domain." +
                            "<a href=\"https://github.com/fugni/fungi-timestamp\" target=\"_blank\">github</a></span>" +
                        "</div>",                
}};

let currentDirectoryString = "";
let currentDirectoryPath = [];