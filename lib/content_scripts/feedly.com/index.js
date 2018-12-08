class Feedly {
    constructor() {
        this.actionsHtml = Utils.getExtensionFileContent("assets/html/feedly_actions.html");

        setInterval(function () {
            // noinspection JSPotentiallyInvalidUsageOfClassThis
            this.drawActions();
        }.bind(this), 333);
    }

    drawActions() {
        if (document.getElementsByClassName("actions-container").length > 0 && document.querySelector("div.actions-container div._frt_actions") === null) {
            // document.getElementsByClassName("actions-container")[0].insertAdjacentHTML('afterbegin', this.actionsHtml); // commented out to avoid UNSAFE_VAR_ASSIGNMENT, workaround below
            for (let child of Utils.str2dom(this.actionsHtml)) {
                document.getElementsByClassName("actions-container")[0].prepend(child);
            }
            this.setEventListeners();
        }

        if (document.querySelector("#headerBarFX header div") !== null && document.querySelector("#headerBarFX header div div._frt_actions") === null) {
            // document.querySelector("#headerBarFX header div").insertAdjacentHTML('afterbegin', this.actionsHtml); // commented out to avoid UNSAFE_VAR_ASSIGNMENT, workaround below
            for (let child of Utils.str2dom(this.actionsHtml)) {
                document.querySelector("#headerBarFX header div").prepend(child);
            }
            this.setEventListeners();
        }
    }

    pickRandom() {
        let entries = document.querySelectorAll("div.entry");
        let randomEntryNumber = Math.floor(Math.random() * entries.length);
        let randomEntry = entries[randomEntryNumber];
        let randomEntryUrl = randomEntry.querySelector("a.title").href;
        window.open(randomEntryUrl); //open entry in new tab
        randomEntry.click();
        setTimeout(function () {
            randomEntry.querySelector("span.board-tag").click();
        }, 333)
        //location.reload(); //reload current tab
    };

    setEventListeners() {
        document.getElementById("_frt_pick_random").addEventListener("click", this.pickRandom);
        document.getElementById("_frt_sort_az").addEventListener("click",  this.sortByName);
        document.getElementById("_frt_sort_p").addEventListener("click", this.sortByPopularity);
    }

    // noinspection JSMethodCanBeStatic
    sortByName() {
        document.querySelectorAll(".bsa-native-ad").forEach(function(el){el.remove();});

        let articles = document.querySelectorAll(".list-entries .entry");

        for (let i = 0; i < articles.length - 2; i++) {
            for (let j = 0; j < articles.length - 2; j++) {
                if (i!==j) {
                    console.log(i + " vs " + j);
                    if (articles[j].attributes.getNamedItem("data-title").value > 
                    articles[j + 1].attributes.getNamedItem("data-title").value) {
                        articles[j].parentNode.insertBefore(articles[j + 1], articles[j]); //swap articles
                        articles = document.querySelectorAll(".list-entries .entry"); //update articles order
                    }
                }
            }
        }
    };

    sortByPopularity() {
        class Article {
            constructor(articleElement) {
                this.element = articleElement;

                this.engagement = {};
                this.engagement.el = articleElement.querySelector("span.engagement");

                if (articleElement.querySelector("span.ago").innerHTML === "Sponsored") {
                    this.engagement.value = -1;
                } else if (this.engagement.el === null) {
                    this.engagement.value = 0;
                } else {
                    this.engagement.value = parseInt(this.engagement.el.innerHTML);
                    if (this.engagement.el.innerHTML.search(/^\d+K$/) === 0) { //for engagement strings with K (kilos) at end, multiply engagement value by 1000
                        this.engagement.value *= 1000;
                    }
                }
            }
        }

        let articles = document.querySelectorAll(".list-entries .entry");

        for (let i = 0; i < articles.length - 1; ++i) {
            for (let j = 0; j < articles.length - 1; ++j) {
                console.log(i + " vs " + j);

                let articleCurrent = new Article(articles[j]);
                let articleNext = new Article(articles[j + 1]);

                if (articleNext.engagement.value > articleCurrent.engagement.value) {
                    articleCurrent.element.parentNode.insertBefore(articleNext.element, articleCurrent.element); //swap articles
                    articles = document.querySelectorAll(".list-entries .entry"); //update articles order
                }
            }
        }
    };
}

new Feedly();