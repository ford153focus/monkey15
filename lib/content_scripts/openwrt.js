//UNFINISHED
// https://openwrt.org/toh/views/toh_available_864

class filters {
    gbOnly() {
        [...document.querySelector(".inline.dataplugin_table").querySelectorAll("tr")].splice(2).forEach(function(el){
            if (isNaN(parseInt(el.querySelector("td.ethernet_gbit_ports").innerHTML))) {
                el.remove();
            }
        });
    }

    byGbPortsAmount(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_VALUE) {
        [...document.querySelector(".inline.dataplugin_table").querySelectorAll("tr")].splice(2).forEach(function(el){
            if (parseInt(el.querySelector("td.ethernet_gbit_ports").innerHTML)<min) {
                el.remove();
            }

            if (parseInt(el.querySelector("td.ethernet_gbit_ports").innerHTML)>max) {
                el.remove();
            }
        })
    }
}

class render {

}

referenceNode = document.querySelector("div[id$='toh_available_864_4']");

userFiltersCode = `<div id="userFilters">
    <ul>
        <li><label>Only with GB-ports <input type="checkbox"></label></li>
        <li><label>GB-ports: More or equal than <input type="number" value="0"> and less or equal <input type="number" value="666"></label></li>
    </ul>
</div>`

referenceNode.parentNode.insertBefore(document.createElement("HR"), referenceNode.nextSibling);
