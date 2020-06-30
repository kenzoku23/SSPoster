//画面のイベントはここに書く
var chokidar = require('chokidar');

const runBtn = document.getElementById('runBtn');
const currentSSImg = document.getElementById('currentSSImg');

const pngPattern = /.*png$/;

runBtn.addEventListener('click', () => {
    chokidar.watch('ファイル名').on('add', path => {
        console.log(path);
        if(pngPattern.test(path)){
            currentSSImg.src = path;
        }
    });
});
