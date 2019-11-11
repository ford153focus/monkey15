setInterval(() => {
    try {
        let statuses = ['Неремонтопригодный', 'Неработоспособный', 'Механические повреждения'];

        document.querySelectorAll('div.goods-wrap').forEach((good) => {
            if (good.querySelector('div.condition')) {
                let condition = good.querySelector('div.condition').innerText;
                if (statuses.includes(condition)) {
                    good.remove();
                }
            }
        });
    } catch (e) {
        console.error(e);
    }
}, 4444);
