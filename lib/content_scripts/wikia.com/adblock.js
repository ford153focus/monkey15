document.querySelectorAll('div[id^="google_ads_iframe_"]').forEach((el) => {
    el.remove();
});
document.querySelector('#INCONTENT_WRAPPER')?.remove();
document.querySelector('#WikiaFooter')?.remove();
document.querySelector('#WikiaRailWrapper')?.remove();
