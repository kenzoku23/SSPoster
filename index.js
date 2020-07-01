//レンダラプロセス
//開発用
const config = require(`config`);

//画面のイベントはここに書く
const chokidar = require(`chokidar`);
const {ipcRenderer} = require(`electron`);

const runBtn = document.getElementById(`runBtn`);
const currentSSImg = document.getElementById(`currentSSImg`);
const runPostDiscord = document.getElementById(`runPostDiscord`);

const pngPattern = /.*jpg$/;

runBtn.addEventListener(`click`, () => {
    chokidar.watch(config.filePath, {
        ignored: `**/thumbnails/**`,
        ignoreInitial : true
    }).on(`add`, path => {
        console.log(path);
        if(pngPattern.test(path)){
            currentSSImg.src = path;
        }
    });
});

runPostDiscord.addEventListener(`click`, () => {
    ipcRenderer.send(`postImage`, decodeURI(currentSSImg.src.replace(new RegExp(`^${location.origin}`), ``)));
});
