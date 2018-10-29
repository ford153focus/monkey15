class Wikia {
    constructor () {
        Wikia.adBlock();
    }

    /**
     * Remove ads
     */
    static adBlock () {
        document.querySelectorAll('div[id^="google_ads_iframe_"').forEach(function(el){el.remove();});
        document.querySelector('#INCONTENT_WRAPPER').remove();
        document.querySelector('#WikiaFooter').remove();
        document.querySelector('#WikiaRailWrapper').remove();
    }
}

window.onload = function(){
    setTimeout(function(){
        console.log('QQQQQQQQQQQQQQQQQQQQ');
        new Wikia();
    }, 333);
};