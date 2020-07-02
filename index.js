//レンダラプロセス
//開発用
const config = require("config");

//画面のイベントはここに書く
const chokidar = require("chokidar");
const {ipcRenderer} = require("electron");

const runBtn = document.getElementById("runBtn");
const currentSSImg = document.getElementById("currentSSImg");
const postDiscordBtn = document.getElementById("postDiscordBtn");
const notPostBtn = document.getElementById("notPostBtn");


runBtn.addEventListener("click", () => {
    chokidar.watch(`${config.filePath}/**/*.jpg`, {
        ignored: "**/thumbnails/**",
        ignoreInitial : true
    }).on("add", path => {
        //問題ない?
        console.log(currentSSImg.src);
        if(!currentSSImg.src){
            console.log(path);
            currentSSImg.src = path;
        }
    });
});

postDiscordBtn.addEventListener("click", () => {
    ipcRenderer.send("postImage", decodeURI(new URL(currentSSImg.src).pathname));
});

notPostBtn.addEventListener("click", () => {
    //なんかHTMLのパスが入る。なんで
    currentSSImg.src = "";
    console.log(currentSSImg.src)
})
