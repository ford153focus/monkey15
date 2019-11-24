/*eslint no-unused-vars: 0*/
// noinspection
//UNFINISHED
// https://openwrt.org/toh/views/toh_available_864

class Filters {
    countFilter(min, max, field) {
        [...document.querySelector('.inline.dataplugin_table').querySelectorAll('tr')].splice(2).forEach(
            (el) => {
                if (parseInt(el.querySelector(`td.${field}`).innerHTML) < min) {
                    el.remove();
                }

                if (parseInt(el.querySelector(`td.${field}`).innerHTML) > max) {
                    el.remove();
                }
            });
    }

    cpuCores(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_VALUE) {
        countFilter(min, max, 'cpu_cores');
    }

    cpuFreq(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_VALUE) {
        countFilter(min, max, 'cpu_mhz');
    }

    byGbPortsAmount(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_VALUE) {
        countFilter(min, max, 'ethernet_gbit_ports');
    }

    wlanChip() {
        [...document.querySelector('.inline.dataplugin_table').querySelectorAll('tr')].splice(2).forEach((router) => {
            ['broadcom', 'mediatek', 'ralink'].forEach((vendor) => {
                if (router.querySelector('td.wlan_hardware').innerText.includes(vendor)) {
                    router.remove();
                }
            });
        });
    }
}

referenceNode = document.querySelector('div[id$="toh_available_864_4"]');

userFiltersCode = Utils.getExtensionFileContent('assets/openwrt.org/html/filters.html');

referenceNode.parentNode.insertBefore(document.createElement('HR'), referenceNode.nextSibling);
