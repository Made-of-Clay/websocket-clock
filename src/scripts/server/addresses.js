"use strict";
/* globals module, require */

const os = require('os');
// let address = interfaces.eth0[0].address;

module.exports = function () {
    let interfaces = os.networkInterfaces();

    let addresses = [];
    for (let key in interfaces) {
        addresses.push(interfaces[key][0].address);
    }
    return addresses;
};