/*eslint max-len: 0*/
/*eslint no-console: 0*/
/**
 * TODO: вычищение стилей советника
 * TODO: перехватить всплывающее уведомление
 */

/**
 * удаляем тэг со стилями
 * @param {Array} mutations - mutations array
 * @param {string} svId - Node id
 */
function removeSvStyles(mutations, svId) {
    mutations.forEach((mutation) => {
        try {
            if (mutation.addedNodes[0].childNodes[0].data.search(svId) !== -1) {
                mutation.addedNodes.forEach((Node) => {
                    console.log(Node);
                    Node.remove();
                    document.documentElement.style['margin-top'] = window.originalMargin;
                });
            }
        } catch (e) {
            console.trace(e);
        }
        return true;
    });
}

/** запоминаем оригинальный margin у <html> */
window.originalMargin = document.documentElement.style['margin-top'];

/** создаём экземпляр MutationObserver */
let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target === document.body) {
            try {
                let re = /^Б[оo]л[еe][еe] выг[оo]дн[аa]я ц[еe]н[аa] н[аa] .+ в м[аa]г[аa]зин[еe] .+\n\s+—\s+[0-9\s]+ [рp][уy]б\./gim;
                if (mutation.addedNodes[0].childNodes[0].innerText.search(re) !== -1) {
                    mutation.addedNodes.forEach((Node) => {
                        Node.remove();
                        removeSvStyles(mutations, Node.id);
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
let config = {childList: true, subtree: true};
/** передаём в качестве аргументов целевой элемент и его конфигурацию */
observer.observe(document.body, config);

/** позже можно остановить наблюдение */
// observer.disconnect();
