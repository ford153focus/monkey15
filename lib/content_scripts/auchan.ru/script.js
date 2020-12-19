// eslint-disable-next-line no-unused-vars
class Monkey15 {
    static getKiloPrice(item) {
        let weightTxt = item.querySelector('a.linkToPDP').innerText.replace(',', '.');
        let weightGram = parseInt(weightTxt.match(/\d+\s*(г|мл)?$/gi)?.shift());
        let weightKilo = parseFloat(weightTxt.match(/\d+\s*(л|кг|шт)$/gi)?.shift());

        let itemPrice = parseFloat(item.querySelector('div.productCardPriceData').innerText);
        let kiloPrice = itemPrice;

        if (weightKilo) {
            kiloPrice = itemPrice / weightKilo;
        } else if (weightGram) {
            kiloPrice = itemPrice / weightGram * 1000;
        }

        return kiloPrice;
    }

    static sort() {
        let items = document.querySelectorAll('div[class="css-n9ebcy-Item"]');
        [...items]
            .sort((item1, item2) => {
                return this.getKiloPrice(item1) - this.getKiloPrice(item2);
            })
            .map((item) => {
                items[0].parentElement.appendChild(item);
            });
    }

    static filter() {
        let discountFrom = document.querySelector('#m15-discount-from input').value;
        let priceFrom = document.querySelector('#m15-price-from input').value;
        let priceTo = document.querySelector('#m15-price-to input').value;

        document.querySelector('#m15-discount-from span.value').innerHTML = discountFrom;
        document.querySelector('#m15-price-from span.value').innerHTML = priceFrom;
        document.querySelector('#m15-price-to span.value').innerHTML = priceTo;

        document.querySelectorAll('div[class="css-n9ebcy-Item"]').forEach((item) => {
            let kiloPrice = Monkey15.getKiloPrice(item);
            let discount = Math.abs(parseInt(item.querySelector('span.discountValue')?.innerText));

            if (isNaN(discount)) {
                discount = 0;
            }

            if (discount < discountFrom ||
                kiloPrice > priceTo ||
                kiloPrice < priceFrom) {
                item.style.display='none';
            } else {
                item.style.display='block';
            }
        });
    }
}
