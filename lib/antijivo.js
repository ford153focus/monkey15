//UNFINISHED

class jivo {
    constructor() {
        [...document.getElementsByTagName("script")].filter(script => script.src.includes("code.jivosite.com")).forEach(script => script.remove());
    }
}
/*
// выбираем целевой элемент
target = document.getElementsByTagName('body')[0];

// создаём экземпляр MutationObserver
observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log(mutation);
    });
});

// конфигурация нашего observer:
// var config = { attributes: true, childList: true, characterData: true };
config = { childList: true, subtree: true};
// передаём в качестве аргументов целевой элемент и его конфигурацию
observer.observe(target, config);

// позже можно остановить наблюдение
// observer.disconnect();
*/