//UNFINISHED
// https://openwrt.org/toh/views/toh_available_864

class filters {
    gbOnly() {
        [...document.querySelector(".inline.dataplugin_table").querySelectorAll("tr")].splice(2).forEach(function(el){
            // noinspection JSUnresolvedFunction
            if (isNaN(parseInt(el.querySelector("td.ethernet_gbit_ports").innerHTML))) {
                // noinspection JSUnresolvedFunction
                el.remove();
            }
        });
    }

    byGbPortsAmount(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_VALUE) {
        [...document.querySelector(".inline.dataplugin_table").querySelectorAll("tr")].splice(2).forEach(function(el){
            // noinspection JSUnresolvedFunction
            if (parseInt(el.querySelector("td.ethernet_gbit_ports").innerHTML)<min) {
                // noinspection JSUnresolvedFunction
                el.remove();
            }

            // noinspection JSUnresolvedFunction
            if (parseInt(el.querySelector("td.ethernet_gbit_ports").innerHTML)>max) {
                // noinspection JSUnresolvedFunction
                el.remove();
            }
        })
    }
}

referenceNode = document.querySelector("div[id$='toh_available_864_4']");

userFiltersCode = Utils.getExtensionFileContent("assets/html/openwrt_filters.html");

referenceNode.parentNode.insertBefore(document.createElement("HR"), referenceNode.nextSibling);
