'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', function() {
    let window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadURL('file://' + __dirname + '/index.html');
    window.on('closed', function() {
        window = null;
    })
});

app.on('window-all-closed', function() {  
    //mac OSはユーザが明示的に終了するまでアプリケーションをアクティブにする。
    if(process.platform !== 'darwin') {
      app.quit();
    }
});