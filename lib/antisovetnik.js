/**
 * TODO: вычищение стилей советника
 * TODO: перехватить всплывающее уведомление
 */

/** запоминаем оригинальный margin у <html> */
window.originalMargin = document.documentElement.style["margin-top"];

/** создаём экземпляр MutationObserver */
observer = new MutationObserver(function (mutations) {
    /** mutations queue */
    window['mutations'] = [];

    mutations.forEach(function (mutation) {
        /** save mutation */
        window['mutations'].push(mutation);

        if (mutation.target === document.body) {
            try {
                let re = /^Б[оo]л[еe][еe] выг[оo]дн[аa]я ц[еe]н[аa] н[аa] .+ в м[аa]г[аa]зин[еe] .+\n\s+—\s+[0-9\s]+ [рp][уy]б\./gim;
                if (mutation.addedNodes[0].childNodes[0].innerText.search(re) !== -1) {
                    mutation.addedNodes.forEach(function (Node) {
                        console.log(Node);
                        Node.remove();
                        removeSvStyles(window['mutations'], Node.id);
                    });
                }
            } catch (e) {
                console.trace(e);
            }
        }
        return true;
    });
});

/** конфигурация нашего observer */
// var config = { attributes: true, childList: true, characterData: true };
config = {childList: true, subtree: true};
// передаём в качестве аргументов целевой элемент и его конфигурацию
observer.observe(document.body, config);

/** позже можно остановить наблюдение */
// observer.disconnect();

/**
 * удаляем тэг со стилями
 * @param mutations
 * @param svId
 */
function removeSvStyles(mutations, svId) {
    mutations.forEach(function (mutation) {
        try {
            if (mutation.addedNodes[0].childNodes[0].data.search(svId) !== -1) {
                mutation.addedNodes.forEach(function (Node) {
                    console.log(Node);
                    Node.remove();
                    document.documentElement.style["margin-top"] = window.originalMargin;
                });
            }
        } catch (e) {
            console.trace(e);
        }
        return true;
    });
}
