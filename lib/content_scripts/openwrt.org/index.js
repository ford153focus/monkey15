/*eslint no-unused-vars: 0*/

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
            /**
             *
             * @param {Element} el -
             */
            function(el) {
                if (parseInt(el.querySelector('td.ethernet_gbit_ports').innerHTML)<min) {
                    el.remove();
                }

                if (parseInt(el.querySelector('td.ethernet_gbit_ports').innerHTML)>max) {
                    el.remove();
                }
            }
        )
    }
}

referenceNode = document.querySelector('div[id$="toh_available_864_4"]');

userFiltersCode = Utils.getExtensionFileContent('assets/html/openwrt_filters.html');

referenceNode.parentNode.insertBefore(document.createElement('HR'), referenceNode.nextSibling);