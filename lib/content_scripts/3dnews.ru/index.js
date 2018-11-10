class DddNews {
    constructor () {
        DddNews.adBlock();
    }

    /**
     * Remove ads
     */
    static adBlock () {
        document.getElementById("left-sidebar").innerHTML = "";
        document.getElementById("right-sidebar").innerHTML = "";
        document.getElementById("most-commented").innerHTML = "";
        
        document.querySelector(".content-block.relatedbox.rbxglob").innerHTML = "";
        document.getElementById("yandex-widget-offers").innerHTML = "";

        document.querySelectorAll(".nomargins.ad").forEach(function(el){
            el.remove();
        });
    }
}

window.onload = function(){
    setTimeout(function(){
        new DddNews();
    }, 333);
};
