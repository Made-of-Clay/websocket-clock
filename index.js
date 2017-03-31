"use strict";
/* globals __dirname, require, console, global */

const fs = require('fs');
const express = require('express');
const app = express();
// const router = express.Router();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const clock = require('./src/scripts/server/clock');
const events = require('events');
// const emitter = new events.EventEmitter();
global.emitter = new events.EventEmitter();

http.listen(3030, () => console.log('listening on 10.0.0.236:3030') );

app.get('/', serveIndex);
app.get('/index.html', serveIndex);

function serveIndex(req, res) {
    res.sendFile(`${__dirname}/index.html`);
}

app.get('/dist/:file', (req, res) => {
    res.sendFile(`${__dirname}/dist/${req.params.file}`);
});

app.get('/assets/socket.io.js', (req, res) => {
    var path = __dirname + '/node_modules/socket.io-client/dist/socket.io.js';
    if (fs.existsSync(path)) {
        res.sendFile(path);
    } else {
        res.status(404).end();
    }
});

// let clock = new Clock();
clock.start();

io.on('connection', (socket) => {
    // let clock = new Clock();
    socket.on('disconnect', () => console.log('A user has disconnected'));
    console.log('A user has connected');
});

global.emitter.on('tick', tickCallback);

function tickCallback() {
    let date = new Date();
    let time = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    };
    // console.log('-------------------');
    // console.log('tick', `${time.hour}:${time.minute}:${time.second}`);
    io.emit('tick', time);
}
