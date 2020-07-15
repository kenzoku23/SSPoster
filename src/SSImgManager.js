class SSImgManager {

    constructor() {
        this.ssCount = 0;
        this.currentSSImg = document.getElementById("currentSSImg");
    }
    

    add(path) {
        this.currentSSImg.src = path;
        this.ssCount++;
    }
}

module.exports = SSImgManager;