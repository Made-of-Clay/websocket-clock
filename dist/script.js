// test
"use strict";
/* globals io */

(function () {
    let socket = io();

    let minHand, hourHand, secHand;

    document.addEventListener('DOMContentLoaded', () => {
        hourHand = document.getElementById('hour-style');
        minHand = document.getElementById('minute-style');
        secHand = document.getElementById('second-style');
    });

    socket.on('tick', time => {
        let rotate = {
            hour: rotateTime(time, 'hour'),
            min: rotateTime(time, 'minute'),
            sec: rotateTime(time, 'second'),
        };
        hourHand.innerHTML = `
            #hour { 
                -webkit-transform: rotate(${rotate.hour}deg);
                -moz-transform: rotate(${rotate.hour}deg);
                transform: rotate(${rotate.hour}deg);
            }`;
        minHand.innerHTML = `
            #minute { 
                -webkit-transform: rotate(${rotate.min}deg);
                -moz-transform: rotate(${rotate.min}deg);
                transform: rotate(${rotate.min}deg);
            }`;
        secHand.innerHTML = `
            #second { 
                -webkit-transform: rotate(${rotate.sec}deg);
                -moz-transform: rotate(${rotate.sec}deg);
                transform: rotate(${rotate.sec}deg);
            }`;
    });

    function rotateTime(timeObj, which){
        switch (which) {
            case 'hour':
                let wholeHr = ((parseInt(timeObj.hour) * 360) / 12);
                let partHr = ((parseInt(timeObj.minute) * 30) / 60);
                return parseInt(wholeHr) + parseInt(partHr);

            case 'minute':
                return ((parseInt(timeObj.minute) * 360) / 60);

            case 'second':
                return ((parseInt(timeObj.second) * 360) / 60);
        }
        // if(which === 'hour'){
        //     var wholeHr = ((parseInt(timeObj.hour) * 360) / 12),
        //     partHr = ((parseInt(timeObj.minute) * 30) / 60),
        //     theHour = parseInt(wholeHr) + parseInt(partHr);
        //     return theHour;
        // } else if(which === 'minute') {
        //     let theMinute = ((parseInt(timeObj.minute) * 360) / 60);
        //     return theMinute;
        // }
    }
})();