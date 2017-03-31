// clock
"use strict";
/* globals module, require, global */
const timers = require('timers');
// const events = require('events');
// const emitter = new events.EventEmitter();

module.exports = (function () {
    class Clock {
        constructor() {
            this.timerId = null;
        }

        start() {
            this.stop();
            let interval = 1000; // 1 sec
            this.timerId = timers.setInterval(() => {
                global.emitter.emit('tick');
            }, interval);
        }

        stop() {
            if (this.timerId !== null) {
                timers.clearInterval(this.timerId);
                this.timerId = null;
            }
        }
    }

    return new Clock();
})();
