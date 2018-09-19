//UNFINISHED

class jivo {
    constructor() {
        [...document.getElementsByTagName("script")].filter(script => script.src.includes("code.jivosite.com")).forEach(script => script.remove());
    }
}
