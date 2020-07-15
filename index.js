//レンダラプロセス
//開発用
const config = require("config");
const ssImgManager = require("./src/SSImgManager");
const ssim = new ssImgManager();

//画面のイベントはここに書く
const chokidar = require("chokidar");
const {ipcRenderer} = require("electron");

const runBtn = document.getElementById("runBtn");
const currentSSImg = document.getElementById("currentSSImg");
const postDiscordBtn = document.getElementById("postDiscordBtn");
const notPostBtn = document.getElementById("notPostBtn");


runBtn.addEventListener("click", () => {
    chokidar.watch(`${config.filePath}/**/*.@(png|jpg)`, {
        ignored: "**/thumbnails/**",
        ignoreInitial : true
    }).on("add", path => {
        ssim.add(path);
    });
});

postDiscordBtn.addEventListener("click", () => {
    ipcRenderer.send("postImage", decodeURI(new URL(currentSSImg.src).pathname));
});

notPostBtn.addEventListener("click", () => {
    currentSSImg.src = "";
})
