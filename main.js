//メインプロセス
`use strict`;
//開発用
const config = require(`config`);

const electron = require(`electron`);
const {ipcMain} = require(`electron`);
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const Discord = require(`discord.js`);
const discordCli = new Discord.Client();
discordCli.login(config.discordToken);

app.on(`ready`, function() {
    let window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadURL(`file://${__dirname}/index.html`);
    window.on(`closed`, function() {
        window = null;
    })
});

app.on(`window-all-closed`, function() {  
    //mac OSはユーザが明示的に終了するまでアプリケーションをアクティブにする。
    if(process.platform !== `darwin`) {
      app.quit();
    }
    discordCli.destroy();
});

app.allowRendererProcessReuse = true;

ipcMain.on(`postImage`, (event, arg) => {
    discordCli.channels.cache.find(ch => ch.name === config.channelName).send({
        files: [arg]
    });
})