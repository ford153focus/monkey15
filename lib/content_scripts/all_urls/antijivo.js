/*eslint no-console: 0*/
//UNFINISHED

[...document.getElementsByTagName('script')]
    .filter((script) => {
        return script.src.includes('code.jivosite.com');
    })
    .forEach((script) => {
        return script.remove();
    });

// выбираем целевой элемент
target = document.getElementsByTagName('body')[0];

// создаём экземпляр MutationObserver
let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log(mutation);
    });
});

// конфигурация нашего observer:
let config = { childList: true, subtree: true};
// передаём в качестве аргументов целевой элемент и его конфигурацию
observer.observe(target, config);

// позже можно остановить наблюдение
// observer.disconnect();
