document.querySelectorAll('article.cartCard').forEach((el) => {
    let cartCardName = el.querySelector('a.cartCardNameLink ').innerText;
    let counter = el.querySelector('input[name="counter-input"]')?.value;
    let cartCardFullPrice = el.querySelector('div.cartCardFullPrice')?.innerText;
    console.log(`${cartCardName} - (${counter} x ${cartCardFullPrice})`);
})
