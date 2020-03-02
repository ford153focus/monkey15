[...document.getElementsByTagName('iframe')].forEach((el) => {
    el.remove(); 
});

[...document.getElementsByTagName('ins')].forEach((el) => {
    el.remove(); 
});

document.querySelectorAll('[id^="google"]').forEach((el) => {
    el.remove(); 
});

document.querySelectorAll('[id^="yandex"]').forEach((el) => {
    el.remove(); 
});

document.querySelectorAll('[id^="inpage"]').forEach((el) => {
    el.remove(); 
});
