/*eslint no-unused-vars: 0*/
// noinspection
//UNFINISHED
// https://openwrt.org/toh/views/toh_available_864

class Filters {
    gbOnly() {
        [...document.querySelector('.inline.dataplugin_table').querySelectorAll('tr')].splice(2).forEach(
            /**
             *
             * @param {Element} el -
             */
            function(el) {
                if (isNaN(parseInt(el.querySelector('td.ethernet_gbit_ports').innerHTML))) {
                    el.remove();
                }
            });
    }

    byGbPortsAmount(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_VALUE) {
        [...document.querySelector('.inline.dataplugin_table').querySelectorAll('tr')].splice(2).forEach(
            function(el) {
                if (isNaN(el.querySelector('td.ethernet_gbit_ports').innerHTML)) {
                    el.remove();
                }
                if (parseInt(el.querySelector('td.ethernet_gbit_ports').innerHTML) < 1) {
                    el.remove();
                }
            }
        )
    }

    byRam(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_VALUE) {
        [...document.querySelector('.inline.dataplugin_table').querySelectorAll('tr')].splice(2).forEach(
            function(el) {
                if (isNaN(el.querySelector('td.ram_mb').innerHTML)) {
                    el.remove();
                }
                if (parseInt(el.querySelector('td.ram_mb').innerHTML) < 333) {
                    el.remove();
                }
            }
        )
    }
}

referenceNode = document.querySelector('div[id$="toh_available_864_4"]');

userFiltersCode = Utils.getExtensionFileContent('assets/openwrt.org/html/filters.html');

referenceNode.parentNode.insertBefore(document.createElement('HR'), referenceNode.nextSibling);
